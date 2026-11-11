"""Compose two phone renders on a dark canvas with a coral glow and drop shadows.

Usage: python -I compose_phones.py <left.png> <right.png> <out.webp> LH LX LY RH RX RY
  LH/RH  phone height in px, LX/LY and RX/RY its top-left corner. Phones may overflow the bottom edge.
Canvas 1400x900, ink tones, coral #E8613F glow, WebP quality 84.
"""
import sys
from PIL import Image, ImageDraw, ImageFilter

W, H = 1400, 900
INK = (14, 11, 10)
CORAL = (232, 97, 63)


def glow(center, radius, alpha):
    """A soft coral ellipse, blurred, as an RGBA layer."""
    layer = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(layer)
    cx, cy = center
    rx, ry = radius
    d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=int(255 * alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(max(rx, ry) * 0.45))
    rgba = Image.new('RGBA', (W, H), CORAL + (0,))
    rgba.putalpha(layer)
    return rgba


def load_phone(path, height):
    im = Image.open(path).convert('RGBA')
    w = round(im.width * height / im.height)
    return im.resize((w, height), Image.LANCZOS)


def shadow(phone, pos, offset=(0, 26), blur=38, alpha=0.62):
    a = phone.getchannel('A').point(lambda v: int(v * alpha))
    layer = Image.new('L', (W, H), 0)
    layer.paste(a, (pos[0] + offset[0], pos[1] + offset[1]))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sh.putalpha(layer)
    return sh


def main():
    left, right, out = sys.argv[1:4]
    lh, lx, ly, rh, rx, ry = map(int, sys.argv[4:10])
    canvas = Image.new('RGBA', (W, H), INK + (255,))
    canvas = Image.alpha_composite(canvas, glow((780, -60), (640, 300), 0.42))
    canvas = Image.alpha_composite(canvas, glow((-40, 940), (420, 300), 0.16))
    lp, rp = load_phone(left, lh), load_phone(right, rh)
    for phone, pos in ((lp, (lx, ly)), (rp, (rx, ry))):
        canvas = Image.alpha_composite(canvas, shadow(phone, pos))
        layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        layer.paste(phone, pos)
        canvas = Image.alpha_composite(canvas, layer)
    canvas.convert('RGB').save(out, 'WEBP', quality=84, method=6)
    print(out, canvas.size, 'left', lp.size, 'right', rp.size)


if __name__ == '__main__':
    main()
