"""Average colour of the opaque pixels of a 16 px wide decode of a cover (coverAverageColorProvider).
Usage: python -I cover_avg.py <cover.jpg>
"""
import sys
from PIL import Image

im = Image.open(sys.argv[1]).convert('RGBA')
h = max(1, round(im.height * 16 / im.width))
small = im.resize((16, h), Image.BILINEAR)
px = [p for p in small.getdata() if p[3] > 0]
r = sum(p[0] for p in px) / len(px)
g = sum(p[1] for p in px) / len(px)
b = sum(p[2] for p in px) / len(px)
print('#%02X%02X%02X' % (round(r), round(g), round(b)), im.size)
