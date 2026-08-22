'use strict';

const { normalizePublishedFiles } = require('./seo-localization');

const changed = normalizePublishedFiles();
console.log(`Normalized localized SEO metadata in ${changed} published HTML files.`);
