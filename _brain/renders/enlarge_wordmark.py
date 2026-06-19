#!/usr/bin/env python3
"""Enlarge the SHABBOS / VILLAGE wordmark on the transparent lamp logo.

The lamp is one big connected component; each letter + gold dash is its own
separate component that doesn't touch the lamp. So we lift the text off via
connected-component labelling (lamp untouched), scale the left word-block and
right word-block, and paste them back anchored on their INNER edge (constant gap
to the lamp) + vertically centered. Scale factor is argv[1] (default 1.3).
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

SRC = "_brain/renders/logo-new-transparent.png"
OUT = sys.argv[2] if len(sys.argv) > 2 else "_brain/renders/logo-bigtext.png"
F = float(sys.argv[1]) if len(sys.argv) > 1 else 1.3

img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
a = arr[:, :, 3]
H, W = a.shape
CX = W // 2

solid = a > 40
labels, n = ndimage.label(solid)
sizes = np.array([(labels == i).sum() for i in range(1, n + 1)])
lamp_label = 1 + int(np.argmax(sizes))

# Text = everything solid that isn't the lamp, restricted to the lower band.
textmask = solid & (labels != lamp_label)
band = np.zeros_like(textmask)
band[700:840, :] = True
textmask &= band

# Lamp-only base (text + dashes removed).
base = arr.copy()
base[textmask] = (0, 0, 0, 0)
base_img = Image.fromarray(base, "RGBA")

# Pull the full text into its own transparent layer.
textlayer = np.zeros_like(arr)
textlayer[textmask] = arr[textmask]


def block(side):
    cols = np.zeros((H, W), bool)
    if side == "left":
        cols[:, :CX] = True
    else:
        cols[:, CX:] = True
    m = textmask & cols
    ys, xs = np.where(m)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    crop = Image.fromarray(textlayer[y0:y1 + 1, x0:x1 + 1], "RGBA")
    return crop, x0, x1, y0, y1


out = base_img.copy()
# Side zones the text may occupy (symmetric about center; lamp keeps the middle).
ZONES = {"left": (34, 478), "right": (776, 1220)}
for side in ("left", "right"):
    crop, x0, x1, y0, y1 = block(side)
    w, h = crop.size
    nw, nh = max(1, round(w * F)), max(1, round(h * F))
    scaled = crop.resize((nw, nh), Image.LANCZOS)
    cy = (y0 + y1) // 2
    ny = cy - nh // 2
    lo, hi = ZONES[side]
    nx = (lo + hi) // 2 - nw // 2           # center within the zone
    nx = max(lo, min(nx, hi - nw))          # clamp inside the zone
    out.alpha_composite(scaled, (int(nx), int(ny)))
    print(f"{side}: {w}x{h} -> {nw}x{nh}  zone {lo}-{hi}, placed x={nx} y={ny}")

out.save(OUT)
print("saved:", OUT)
