#!/usr/bin/env python3
"""Make the cream/tan background of the lamp logo transparent.

Edge flood-fill approach: only background pixels CONNECTED to the image border
are removed, so the warm glow inside the lantern (enclosed by the dark frame)
is preserved. Alpha is feathered for clean anti-aliased edges.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

SRC = sys.argv[1]
OUT = sys.argv[2]
# optional: bake a solid background color (RGB hex) instead of transparency
BAKE = sys.argv[3] if len(sys.argv) > 3 else None

img = Image.open(SRC).convert("RGBA")
arr = np.array(img).astype(np.int16)
rgb = arr[:, :, :3]
h, w = rgb.shape[:2]

# Background color = median of a border frame (robust to stray dark pixels)
frame = np.concatenate([
    rgb[:8, :, :].reshape(-1, 3),
    rgb[-8:, :, :].reshape(-1, 3),
    rgb[:, :8, :].reshape(-1, 3),
    rgb[:, -8:, :].reshape(-1, 3),
])
bg = np.median(frame, axis=0)
print("background color:", bg)

# Distance of every pixel from the background color
dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))

TOL = 42          # pixels within this color distance count as "background-like"
bgmask = dist < TOL

# Keep only background-like regions connected to the border
labels, n = ndimage.label(bgmask)
border_labels = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border_labels.discard(0)
connected_bg = np.isin(labels, list(border_labels))

# Also remove pixels that VERY closely match the bg color anywhere (the enclosed
# letter counters in B/O/A/G that flood-fill can't reach). The cream/gold logo
# strokes are far enough from the tan bg color to stay safe at this tight tol.
TIGHT = 34
connected_bg = connected_bg | (dist < TIGHT)

# Feathered alpha: full transparent in the bg, soft transition in a color band
SOFT = 22.0  # width of the transition band in color-distance units
soft_alpha = np.clip((dist - (TOL - SOFT)) / SOFT, 0.0, 1.0)
alpha = np.where(connected_bg, (soft_alpha * 255).astype(np.uint8), 255).astype(np.uint8)

# Smooth the alpha edge by 1px to kill jaggies
alpha = ndimage.gaussian_filter(alpha.astype(np.float32), sigma=0.7)
alpha = np.clip(alpha, 0, 255).astype(np.uint8)

out = arr.copy().astype(np.uint8)

if BAKE:
    bc = tuple(int(BAKE[i:i+2], 16) for i in (0, 2, 4))
    a = alpha[:, :, None] / 255.0
    baked = (out[:, :, :3] * a + np.array(bc) * (1 - a)).astype(np.uint8)
    out[:, :, :3] = baked
    out[:, :, 3] = 255
    print("baked background:", bc)
else:
    out[:, :, 3] = alpha

Image.fromarray(out, "RGBA").save(OUT)
print("saved:", OUT)
