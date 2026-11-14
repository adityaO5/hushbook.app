"""Mean per-channel pixel difference between two cover images at the smaller one's size.
Usage: python -I cover_diff.py <a.jpg> <b.jpg>
"""
import sys
from PIL import Image, ImageChops, ImageStat

a, b = Image.open(sys.argv[1]).convert('RGB'), Image.open(sys.argv[2]).convert('RGB')
size = min(a.size, b.size)
a, b = a.resize(size, Image.LANCZOS), b.resize(size, Image.LANCZOS)
print('size', size, 'mean abs diff per channel', [round(v, 2) for v in ImageStat.Stat(ImageChops.difference(a, b)).mean])
