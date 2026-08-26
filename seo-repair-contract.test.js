'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const localeConfig = require('./localization.config');
const { buildManifest } = require('./scripts/seo-preservation');

const ROOT = __dirname;
const BASE_URL = 'https://hushbook.app';
const DOWNLOAD_IMAGE_PATH = 'assets/img/og-hushbook.webp';
const DOWNLOAD_IMAGE_URL = `${BASE_URL}/${DOWNLOAD_IMAGE_PATH}`;
const DOWNLOAD_PAGE = 'download.html';
const CORRUPTION_TOKENS = ['BushBook', 'HuhBook', 'HBTER2X', 'HBOPEXIX'];
const CONTEXTUAL_NOTUND_ALLOWLIST = Object.freeze({});
const HEAD_ONLY_BODY_SHA256 = Object.freeze({
  'index.html': '7c07d9dc65442555c1778aa333eb65de054fd18ec138a25da5d1162ef542777b',
  'download.html': '145c2eb6ce7cdcfdd350379a1a535750a67959745956ce1dd920d0ee1e46ea7e',
  'about.html': '36613978ebfd48dacb3ef830ca32e39a8cbb6c85dc8c81dfa84719e4c7d26aef',
  'privacy-policy.html': '2bcff1210b0c09e51222db409032d90e3c8b3fa1ba6f44ac3b873027cd0ad29c',
  'terms-conditions.html': '5b4ae048d38e3bc2a10e99ac2624cdd8d7250fb07ec7edd665ed2b5b7cd248d4',
  'refund-policy.html': '1730a9cf21e2fc7f4cefb8edb00dc8982ccb72a492392c3fe12c19f2350abf73',
  'licenses.html': '16b1266e76730f319c5f2375c138a12b560537e0fec023ac2f0147a3036604ae',
  'de/index.html': '321a8566f24abdb4b0aeaa140cb577dd5cfe63d250a5be62c3d5bbe237233358',
  'de/download.html': '696a10e50e94a93a3a430d052cf2cf9322d5b6338e25564cea5fde2965e34acf',
  'de/about.html': 'be6250af512635a5a007e0a5e39b4317cd5de3bd58b2087fc1d4712cd0610844',
  'de/privacy-policy.html': '38a2fab4c94d1a072ad1cd45ac2337cb4f3f1167f0a64135fe47f799d69d994b',
  'de/terms-conditions.html': '99082901c2cd425b8b60e4c50127c593c8483ac33e83bbeb221953ddb81cdb23',
  'de/refund-policy.html': '436bc98204be6c31e8cb9d1834396c9262a2ef40d4d2f2b9d6bbada420399c9a',
  'de/licenses.html': '2a35d8cdefb727ff5e5c0568ebde3845777637aeee53f55e67bbfe3bdf9c1c43',
  'fr/index.html': 'f9cf8508d36859baa591dbdfb456ce2eee6faf478e2a8c20c6d5f3614e039765',
  'es-ES/index.html': '578fd65b2a2057d10254a13d869e77dc21bfeb041c414aeb23aaf65e9246dfc2',
  'es-ES/download.html': '67dbc132c7a8c5d09c6f4e7e63a3ee5c66e5df841286f0ca3cc63b81c717fe60',
  'es-ES/about.html': 'c356a9bac25f4570f9485c94337b6589b5c45b0c4df432ca227ffe2292ce4234',
  'es-ES/privacy-policy.html': '1c5e412c6a94e89d7eaef39630f41f558840b37335fd149ee5c3c1d747c4ad75',
  'es-ES/terms-conditions.html': '0afab70a768185312877055c2c0ae87fb9f583ea7b86059000607bd059909961',
  'es-ES/refund-policy.html': '565625cf6e69d80800b2a0c59e16e21edb7a8efbfa1c095b95dbb91e53eb0d7e',
  'es-ES/licenses.html': 'd40fa3286f5c48ef441fdf124f09343ceb85d968cda275ff3abfd49a4971ce9e',
  'es-419/index.html': '168fbdd279237d0143ad2a42db14d144878a4eeb4b286c792ccf60196ac97489',
  'es-419/download.html': '65f901db2c3f628b6ef412fc4adaabcfd659bb4652b0ebfb8c7ffc794ba160f8',
  'es-419/about.html': '955f55220c620079d830022df832ec7103c6e90b657bab67f003b581ad054e31',
  'es-419/privacy-policy.html': 'd0ced7c486fdcffd162bd4f4f9264b11a531d3febe763f9db36521addab86a99',
  'es-419/terms-conditions.html': 'bdae57c6bf5528a64000755bedabe56af3b3107f79a33d68dcf209d2af6d0e5e',
  'es-419/refund-policy.html': 'f6f6bbc54817e75e1b34c0859308f6c779c0c01818bb96bab15ff2f1ecd0bad3',
  'es-419/licenses.html': '0db236edf1d982da4023febea39b722c232d2747f04ea2371618055e3f581f61',
  'pt-BR/index.html': 'a4906ca0cec885dd1d762e49b16a1321e21208ecfcb6a7416464254ceb210aef',
  'pt-BR/download.html': 'cb3185f44efa9fb7458f130fda5aa33c13580483f4e9eca767a887fca2573328',
  'pt-BR/about.html': '17d6129031af5289dc84a28dca87fac03f2d36999a2ade6ba1d198024fd28023',
  'pt-BR/privacy-policy.html': '9092b2817434d321ad0bd5164bec2511ac287be07b742a75612d6302fb05b6ae',
  'pt-BR/terms-conditions.html': '8de96880751ba2ab36e4476c77f3b90bb149028f206644915dd078e64d2bc044',
  'pt-BR/refund-policy.html': '29bf3247657cc70312afe1899f4804a5768ea8cdf9cad359946d9290bd157cdb',
  'pt-BR/licenses.html': '958e9f1f24214dd87ae9ac023b0effdb6e9d52c77e17d9bb941f533fdc3cce53',
  'pt-PT/index.html': 'dd5e78fb3d63731fba2dd320b8461232ada436e4d1245c910d0d60e95ea9fe14',
  'pt-PT/download.html': 'af06786bd9d047b7cfe67649f066e1270712b7b00a85fc13a76c907ab202d4de',
  'pt-PT/about.html': '7ae1029c7760d335911350aeaf7e55bf75f05080f2a736d0e48847d3e6b42b1d',
  'pt-PT/privacy-policy.html': 'b358703e9894f8b443426b6465bf372935108b68906cddf734f6c1db351098c8',
  'pt-PT/terms-conditions.html': '2561a359dbff980c8278fef07fc815243a4f96e97991111c33d9c75436d275ac',
  'pt-PT/refund-policy.html': 'fafbbc3fd21c3c2746d23124440b9a1d211634ac34c3bb48359d97620c68dc93',
  'pt-PT/licenses.html': 'c57bd381270087def18a89f85958d23b755d0827a00df3e867ec6f7f864fee71',
  'it/index.html': '7ca791bad0bcbd858cedd3f86ed10d12c59d1ab1cdff4a83bc984ea3485f9335',
  'it/download.html': '77b5d8e4c628122aea1d202bd35dba842400b19e8d154e74dfef374e3efeea58',
  'it/about.html': '6c67f0a13df2a66ddaebedbc7a48054f5db3136292ea65fc22aafd3c9880ac97',
  'it/privacy-policy.html': '2f2212e498eac972cd56d17e8b20251bd8f8603af84e1858d01093c19642d39f',
  'it/terms-conditions.html': 'd7a07a238aad3aeb0c6f033492cba4011bf15bd7cc1f6e1db395a2230b214932',
  'it/refund-policy.html': '65e2decd2de19b60946f7d5d094ac3663488aeb8a9ec5a04084b424fac9eb016',
  'it/licenses.html': 'fa0dc9d77bb131fc363fff45c7346331d14424892f6b2ba16de155e7eb3008b6',
  'ja/index.html': '98c6b3298abec5d9a9b9c7e26629312c68217d779ce3420f4333657816f210f0',
  'ja/download.html': '7abc6e1a8339312fef7b0fbdd2505764ef98e2350902634c8d0b16b85518c6fd',
  'ja/about.html': '9834e1319fa1ed92d49c9f779aa920c2a7d1280feaaba15bba01c2eab6a4e1ca',
  'ja/privacy-policy.html': '1bc95ce54f91969768916c76380bf7f21f5bd7ca1572e494b57355421f70ac7c',
  'ja/terms-conditions.html': '21f52437a90a2f456f71317c6fbe85d4d00f66f9af5bc00773bd947033e5c6ca',
  'ja/refund-policy.html': '4d13ad7748a3545595da2d10516048a1cb42d19eddfb69c2d73750146d57f7a8',
  'ja/licenses.html': '7e24b46afe0a5d814567f5e91d1c5dce74aa14ba04a4bfd958f020cad04c7139',
  'ko/index.html': 'def1af6776a333c880dac94d1f604b96d0b2cd2dfcd1cee41e0de4041ff883f6',
  'ko/download.html': 'adec22142430c60022167a5a76e62d9ee95fc0e5a0b23f50aaad5664a117b755',
  'ko/about.html': 'cbc5274b0cfe1b98f96665b889ae687f38df8924b13cab2835ec7e34b8253c0c',
  'ko/privacy-policy.html': '82e177698917d48cfad356de11eae4abf07394da8eb8c93e5eb73f24bae19fe1',
  'ko/terms-conditions.html': 'b378898a28bf95ae06c679f024226a16e28d4bec41488805f4c96d791ec30b96',
  'ko/refund-policy.html': '335d458f79a1b90f9969ad8983bbcb56834755d64c84832200510aa4dda63084',
  'ko/licenses.html': '1e0f4e89619add22a87d23982521ab5594d171e2815e0a2d2dca7d64bf89765e',
  'nl/index.html': 'dabf1898825b0a8dfd95ad9d532d89f7065e0081505fd9c5a6b92f051c20a5f6',
  'nl/download.html': '7414c4fb31709c93d78d2852a5baf04cd1384c5ee7223b163dc8068271e1b11d',
  'nl/about.html': 'fe0cd3748f611c9f6cba1dd5713f04da50a0d95ca643b532869627def13037e8',
  'nl/privacy-policy.html': '702874be77686bbf084be609e03cbbce108787cc2a5179fdf35b8932cc71025b',
  'nl/terms-conditions.html': 'd1073ea5fb9800e5af7d3be0ec65468125110c6934230904309e614612c12f07',
  'nl/refund-policy.html': '879a0f2f4afa13a491ccd7e31c319ad60338c0b10471ae3ac5fc301c73a210b8',
  'nl/licenses.html': 'ad2a4ae660b310c6578d2f653c619be0eaa794c4104503842cc58627e458f97c',
  'pl/index.html': '40aa887243b46629437964e8f26418125cc3a10c88defab4fdc94e93d5c4cae3',
  'pl/download.html': '7ee92c3037098fb2c847efebcf854f47adfbf79779a1cb025f48a276e328457a',
  'pl/about.html': '693656e457e37b3a9e9a561a4de8463684b21cf24b3d1abeb7f6a8e7484fe6a3',
  'pl/privacy-policy.html': '4be00a852f33bcce6ce79de22dadefb2d2e2704442330fdd4995381e9faf8ea6',
  'pl/terms-conditions.html': 'ac43aef6e3f6595bab30b1aba14210a91bb22e135b9cdb5af5023c2f65529ca1',
  'pl/refund-policy.html': '660738633518a2ad2e6a95e65e174c8d274576eb34c064b4f11183d32597740e',
  'pl/licenses.html': '56c6f73ca229960b6b5da75cbec138f9680e4631921fe63e319e0ac9c0493d12',
  'tr/index.html': 'd6b3da52d5aea1e9353b7ea0cada56c7c8eebf2490465e72c7e3134d947a0b60',
  'tr/download.html': '1ae620b442560f8042f13bcdfe813f200f1d62d4049dd5f54965d6abdd7792fc',
  'tr/about.html': '740aa6eea24c6c8d94f329ddb3311a98e66d72a22d8a3be268cb74bab19fb982',
  'tr/privacy-policy.html': 'e0d0a79b466a4c1d3847f392b5b3296d247c417ea858a24889f62a2c92723360',
  'tr/terms-conditions.html': '7061cd6085e5c268f3181610cb0e8729d9e7933a2e80bf8fa95a435b1d18b455',
  'tr/licenses.html': '774c7e091136426af95ed30656c93bb7c5e2425e24f10d9c9d21ba650e07219c',
  'ru/index.html': '2a99d8a0d75276d3ae26408d8ce005bcca19d572ad433c0373b3c6403979b653',
  'ru/download.html': '4f3d13a2795ebaa8b61260cddcced7280f95c655d8f3850478e459291363821c',
  'ru/about.html': '8086d7fcd6ed1cd6b52db75d599e284af3b16436f8505cbf21c6e96f4406c884',
  'ru/privacy-policy.html': 'bc644e3559d00356fa544141a6a3ca17504eb99fae1607f131b6e1366620d6f8',
  'ru/terms-conditions.html': '6ab59c57c6858cd29f92de7a84efb21ca7e6e74002e26c14393d0c034347ce43',
  'ru/refund-policy.html': '591b82cc8ff6a08582413f5f56660b7f179e14a94ee8bce21303dce98a816e71',
  'ru/licenses.html': 'cd04b656c646cb456bc61e2781dee3b46f3a05110566642caa3c9e4095768dc1',
  'uk/index.html': '0ee62020b9c1920a21f028214e17d1f1d3de48508f11f3aee6382473ee700351',
  'uk/download.html': 'b1becc74c64a96158081d39c2d581b0f644bc04b39de7f2df692437910725a82',
  'uk/about.html': '00c2487fa1963f66b63133819b2b32941ef1703d6b80848f9e610b9c83624516',
  'uk/privacy-policy.html': '9032a8b807ffb5ba640dea9214c7d877a5e290e35887fce3459cd80a231bec6e',
  'uk/terms-conditions.html': 'fd77cc49944d0cef3fcf9604136e6bda3100bc8f94afea04e1d73ec098489d3f',
  'uk/refund-policy.html': '68569ab121ad763df9509919814508b5f0fef47735a2ea4f00fab04fcc12fd1f',
  'uk/licenses.html': 'e6a25d747f0d6d625f971956dbcb24f3d8779eaf8e1e8546e5a000535bd8c851',
  'ar/index.html': '13e0251103935024c4bc60ddd84d6200c1f3ff0dc24583a14fb2ecd8a032f4bc',
  'ar/download.html': 'e4f8b0432a4917b6b3d522e0e181df6b96e30c16423b6c67849c8b69970f5f12',
  'ar/about.html': '68c612bb2e6360efa4289f212c6e77e86663ce8b58a1630a276e45639a2b7993',
  'ar/privacy-policy.html': '0aa4cbeb1304590e83575b593ad802debe34cd9f1c803598ca20f0fd0318946e',
  'ar/terms-conditions.html': '1f3bc3fe9c56996f5f64f062e382ab2f661004075d7dc3056b982ff9b26ee7d4',
  'ar/refund-policy.html': '8eb3c5ed3400201a7f64dd15c0f28eeafa0bcbfbf551236d01f594ebba329d35',
  'ar/licenses.html': 'e3411752d1447aa79892ef942536e182abb4642124ade56816e4ddefbae4e7cf',
  'id/index.html': '52ae066dc180f2d799c17b08da16ee118e2bae8e37ddcb630433478a01389525',
  'id/download.html': '1d5eddfbf1fae525b94bdf7cf56cb29758c5a85e13aa3eb041fe7239551b1c87',
  'id/about.html': '4445e073589013ee8529df311bbbe8f01f86bbe23239ea46249ab33a71a12cac',
  'id/privacy-policy.html': '8e07da8c42f1b5a34309c0e8713dd737976f13f726f4bfd1df7c04ae8a715669',
  'id/terms-conditions.html': '4dbadce13c546da0e95c6a024a43b2a55d9ddd2cd04d5aee9a04b6604d8061ee',
  'id/refund-policy.html': '78ba2c34fb5c031a57bfff06b5d56ed9beaab57453760826c8d176093256b48f',
  'id/licenses.html': '07c593d626ba484883088a569417e0f459a4ead2130bbbb1ff1e02c363e63676',
  'th/index.html': 'cf10b36282c41cb978af6fb04bace5ed4fd5f10c7ed469f201613db06ef73973',
  'vi/index.html': 'a7bb51a76443e722d9ccb7bc973c9eb2f8315227a4f757fad81a64b0504102c1',
  'sv/index.html': '36b26515ddcda5d685452fd75bceb65813df9bdf0fddca8fce3cc75f77c386a1',
  'sv/download.html': '2e82174d1e8f3bddbb9750b2137ac3fe571e351c694c2a850cea842eb0bc7c6d',
  'sv/about.html': 'eae8675c0cf971e43ae7ed3c011f13e3486729608ff1188174cd094e5b6ef722',
  'sv/privacy-policy.html': '731410078f6b95c76cd31b8f352d03767a4be837f2129d86a2f6a893a39c4761',
  'sv/terms-conditions.html': 'df9990e13f8fd58c70e120e33a16f8f3be8b67d709a0cf3647f3fa0fa192273a',
  'sv/refund-policy.html': '72c8df3add020750dd1b9b0459f191fa71c83e507257c9b6e0739a358eb7d49d',
  'sv/licenses.html': '5e5d47209c7769dd820419ca90f8929a27e3a4f7663a7761425819adda1f4794',
});

function toPosix(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function pagePath(locale, file) {
  const stem = file.replace(/\.html$/, '');
  if (locale === localeConfig.defaultLocale) {
    return stem === 'index' ? '/' : `/${stem}`;
  }
  return stem === 'index' ? `/${locale}` : `/${locale}/${stem}`;
}

function pageUrl(locale, file) {
  return `${BASE_URL}${pagePath(locale, file)}`;
}

function pageFile(locale, file) {
  return locale === localeConfig.defaultLocale
    ? path.join(ROOT, file)
    : path.join(ROOT, locale, file);
}

function readHtml(locale, file) {
  return fs.readFileSync(pageFile(locale, file), 'utf8');
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([A-Za-z_:][A-Za-z0-9:._-]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function collectMetaTags(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
}

function getMetaEntries(html, attributeName, attributeValue) {
  return collectMetaTags(html).filter((entry) => entry[attributeName] === attributeValue);
}

function getSingleMatch(html, pattern) {
  const globalPattern = pattern.global ? pattern : new RegExp(pattern.source, `${pattern.flags}g`);
  const matches = [...html.matchAll(globalPattern)];
  return matches.length === 1 ? matches[0][1] : null;
}

function getTitle(html) {
  return getSingleMatch(html, /<title>([^<]*)<\/title>/i);
}

function getMetaDescription(html) {
  return getSingleMatch(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
}

function getHtmlAttributes(html) {
  const match = html.match(/<html\b([^>]*)>/i);
  return match ? parseAttributes(match[1]) : null;
}

function extractNotundContexts(html) {
  const token = 'Notund';
  const contexts = [];
  let start = 0;
  while (start < html.length) {
    const index = html.indexOf(token, start);
    if (index === -1) break;
    const snippet = html
      .slice(Math.max(0, index - 40), Math.min(html.length, index + token.length + 40))
      .replace(/\s+/g, ' ')
      .trim();
    contexts.push(snippet);
    start = index + token.length;
  }
  return contexts;
}

function postHeadBodySha256(html) {
  const headClose = html.search(/<\/head>/i);
  assert.notEqual(headClose, -1, 'HTML must contain </head>');
  return sha256(html.slice(headClose + '</head>'.length));
}

function describeValue(value) {
  const serialized = JSON.stringify(value);
  return serialized.length <= 160 ? serialized : `${serialized.slice(0, 157)}..."`;
}

assert.ok(
  fs.existsSync(path.join(ROOT, DOWNLOAD_IMAGE_PATH)),
  `${DOWNLOAD_IMAGE_PATH} must exist for download social metadata contract`,
);

const issues = [];
const homepageBodyHashes = new Map(buildManifest().homepages.map((entry) => [entry.path, entry.postHeadBodySha256]));

for (const locale of localeConfig.publishedLocales) {
  for (const page of localeConfig.publicPages) {
    const relativePath = toPosix(locale === localeConfig.defaultLocale ? page : path.join(locale, page));
    const html = readHtml(locale, page);

    const ogTypeEntries = getMetaEntries(html, 'property', 'og:type');
    if (ogTypeEntries.length !== 1) {
      issues.push(`${relativePath} must have exactly one og:type meta tag; found ${ogTypeEntries.length}.`);
    } else if (ogTypeEntries[0].content !== 'website') {
      issues.push(`${relativePath} og:type must be "website"; found ${describeValue(ogTypeEntries[0].content)}.`);
    }

    const twitterCardEntries = getMetaEntries(html, 'name', 'twitter:card');
    if (twitterCardEntries.length !== 1) {
      issues.push(`${relativePath} must have exactly one twitter:card meta tag; found ${twitterCardEntries.length}.`);
    } else if (twitterCardEntries[0].content !== 'summary_large_image') {
      issues.push(`${relativePath} twitter:card must be "summary_large_image"; found ${describeValue(twitterCardEntries[0].content)}.`);
    }

    if (html.includes('\uFFFD')) {
      issues.push(`${relativePath} contains U+FFFD replacement characters.`);
    }

    for (const token of CORRUPTION_TOKENS) {
      if (html.includes(token)) {
        issues.push(`${relativePath} contains corruption token ${JSON.stringify(token)}.`);
      }
    }

    const notundContexts = extractNotundContexts(html);
    if (notundContexts.length > 0) {
      const approvedContexts = CONTEXTUAL_NOTUND_ALLOWLIST[relativePath] ?? [];
      const unknownContexts = notundContexts.filter((context) => !approvedContexts.includes(context));
      if (unknownContexts.length > 0) {
        issues.push(`${relativePath} contains unapproved Notund context(s): ${unknownContexts.map((context) => JSON.stringify(context)).join(', ')}.`);
      }
    }

    if (page === DOWNLOAD_PAGE) {
      const title = getTitle(html);
      const description = getMetaDescription(html);
      if (!title) {
        issues.push(`${relativePath} must have exactly one <title> for download social metadata.`);
      }
      if (!description) {
        issues.push(`${relativePath} must have exactly one meta description for download social metadata.`);
      }

      for (const [attributeName, attributeValue, expectedValue] of [
        ['property', 'og:site_name', 'HushBook'],
        ['property', 'og:title', title],
        ['property', 'og:description', description],
        ['property', 'og:url', pageUrl(locale, page)],
        ['property', 'og:image', DOWNLOAD_IMAGE_URL],
        ['name', 'twitter:card', 'summary_large_image'],
        ['name', 'twitter:title', title],
        ['name', 'twitter:description', description],
        ['name', 'twitter:image', DOWNLOAD_IMAGE_URL],
      ]) {
        const entries = getMetaEntries(html, attributeName, attributeValue);
        if (entries.length !== 1) {
          issues.push(`${relativePath} must have exactly one ${attributeValue} meta tag; found ${entries.length}.`);
          continue;
        }
        if (entries[0].content !== expectedValue) {
          issues.push(`${relativePath} ${attributeValue} must be ${describeValue(expectedValue)}; found ${describeValue(entries[0].content)}.`);
        }
      }
    }
  }
}

for (const page of localeConfig.publicPages) {
  const relativePath = `ar/${page}`;
  const html = readHtml('ar', page);
  const htmlAttributes = getHtmlAttributes(html);
  if (!htmlAttributes) {
    issues.push(`${relativePath} must declare an <html> root.`);
    continue;
  }
  if (htmlAttributes.lang !== 'ar') {
    issues.push(`${relativePath} html lang must be "ar"; found ${JSON.stringify(htmlAttributes.lang)}.`);
  }
  if (htmlAttributes.dir !== 'rtl') {
    issues.push(`${relativePath} html dir must be "rtl"; found ${JSON.stringify(htmlAttributes.dir)}.`);
  }
}

for (const [relativePath, expectedHash] of Object.entries(HEAD_ONLY_BODY_SHA256).sort(([left], [right]) => left.localeCompare(right))) {
  const actualHash = homepageBodyHashes.get(relativePath) ?? postHeadBodySha256(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
  if (actualHash !== expectedHash) {
    issues.push(`${relativePath} post-head body hash changed for a head-only repair page.`);
  }
}

if (issues.length > 0) {
  const uniqueIssues = [...new Set(issues)];
  throw new Error(`SEO repair contract failures (${uniqueIssues.length}):\n- ${uniqueIssues.join('\n- ')}`);
}

console.log('SEO repair contract passes.');
