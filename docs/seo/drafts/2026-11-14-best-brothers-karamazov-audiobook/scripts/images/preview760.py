"""Downscale images to 760 px wide PNGs (the blog's display width) for a readability check.
Usage: python -I preview760.py <out_dir> <img> [<img> ...]
"""
import os
import sys
from PIL import Image

out = sys.argv[1]
for p in sys.argv[2:]:
    im = Image.open(p).convert('RGB')
    h = round(im.height * 760 / im.width)
    dest = os.path.join(out, 'p760-' + os.path.splitext(os.path.basename(p))[0] + '.png')
    im.resize((760, h), Image.LANCZOS).save(dest)
    print(dest, im.size, '->', (760, h), os.path.getsize(p) // 1024, 'KB source')
