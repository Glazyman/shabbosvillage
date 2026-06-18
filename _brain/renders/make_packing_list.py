#!/usr/bin/env python3
"""Generate the Shabbos Village packing list PDF (print-quality, A4/Letter).

Run: python3 make_packing_list.py
Output: ../../public/shabbos-village-packing-list.pdf
"""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth, registerFont, registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont

# Embed real TrueType fonts so text renders in every PDF viewer.
# Serif (Georgia) for headings/title = editorial feel; Arial for body/checklists.
_FONTS = {
    "Serif":        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "Serif-Bold":   "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "Serif-Italic": "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
    "Body":         "/System/Library/Fonts/Supplemental/Arial.ttf",
    "Body-Bold":    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "Body-Italic":  "/System/Library/Fonts/Supplemental/Arial Italic.ttf",
}
for _name, _path in _FONTS.items():
    registerFont(TTFont(_name, _path))
registerFontFamily("Serif", normal="Serif", bold="Serif-Bold", italic="Serif-Italic")
registerFontFamily("Body", normal="Body", bold="Body-Bold", italic="Body-Italic")

# Font role aliases used throughout the document
F_TITLE   = "Serif-Bold"
F_SUB     = "Serif-Italic"
F_HEAD    = "Serif-Bold"
F_BODY    = "Body"
F_BODY_B  = "Body-Bold"
F_FOOT    = "Body-Italic"

# Brand palette
FOREST = HexColor("#2D5016")
CREAM  = HexColor("#FDFAF5")
GOLD   = HexColor("#D4A853")
BODY   = HexColor("#4a4a3a")
MUTED  = HexColor("#9a957f")

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public",
                   "shabbos-village-packing-list.pdf")
OUT = os.path.abspath(OUT)

PAGE_W, PAGE_H = LETTER
MARGIN = 0.7 * inch
COL_GAP = 0.45 * inch
COL_W = (PAGE_W - 2 * MARGIN - COL_GAP) / 2

SECTIONS = [
    ("Shelter & Sleeping", [
        "Tent (and footprint)",
        "Tent stakes & mallet",
        "Tarp / groundsheet",
        "Sleeping bag",
        "Sleeping pad or air mattress",
        "Pillow",
        "Extra blankets",
    ]),
    ("Shabbos Essentials", [
        "Candles + candleholders",
        "Safe, fire-proof surface for candles",
        "Challah",
        "Wine / grape juice",
        "Kiddush cup",
        "Pre-cooked Shabbos food",
        "Hot plate / blech (if permitted)",
        "Siddur / bentchers",
        "Tallis",
        "Shabbos clothing",
        "Battery lanterns / timer-friendly lights",
        "Pre-torn toilet paper / tissues",
        "Eruv awareness — no-carry items",
    ]),
    ("Clothing", [
        "Weather-appropriate layers",
        "Rain jacket",
        "Comfortable walking shoes",
        "Hat",
        "Warm clothing for night",
        "Modest swim / water-area attire",
    ]),
    ("Food & Kitchen", [
        "Cooler with ice packs",
        "Non-perishable snacks",
        "Reusable plates, cups & cutlery",
        "Water bottles",
        "Dish soap & towel",
        "Trash bags",
        "Food storage containers",
        "Note: shared warmers & freezers on-site;",
        "all food locked securely overnight",
    ]),
    ("Toiletries & Health", [
        "Toothbrush & toothpaste",
        "Soap / shampoo",
        "Towel",
        "Sunscreen",
        "Bug spray",
        "Personal medications",
        "First-aid basics",
        "Hand sanitizer",
        "Wet wipes",
    ]),
    ("Gear & Extras", [
        "Flashlight / headlamp + batteries",
        "Portable charger",
        "Folding chairs",
        "Picnic blanket",
        "Reusable water jug",
        "Sunglasses",
        "Books & games (non-electronic)",
        "Cash",
        "ID",
        "Booking confirmation",
    ]),
]

REMEMBER = [
    "Directions are sent after booking.",
    "No pets, please.",
    "Fires only in designated rings.",
    "Quiet hours: 10 PM Friday through Havdalah.",
]


def wrap(text, font, size, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines or [""]


def draw_checkbox(c, x, y, size=8.5):
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.1)
    c.setFillColor(CREAM)
    c.rect(x, y, size, size, stroke=1, fill=1)


class Doc:
    def __init__(self, c):
        self.c = c
        self.col = 0
        self.x = MARGIN
        self.top = None  # set after header
        self.y = None

    def page_bg(self):
        self.c.setFillColor(CREAM)
        self.c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    def footer(self):
        c = self.c
        c.setStrokeColor(GOLD)
        c.setLineWidth(0.6)
        c.line(MARGIN, 0.55 * inch, PAGE_W - MARGIN, 0.55 * inch)
        c.setFont(F_FOOT, 9)
        c.setFillColor(MUTED)
        c.drawCentredString(PAGE_W / 2, 0.38 * inch, "shabbosvillage.com")

    def new_page(self, first=False):
        if not first:
            self.footer()
            self.c.showPage()
        self.page_bg()
        if first:
            self.draw_header()
        else:
            self.top = PAGE_H - MARGIN
            self.y = self.top
        self.col = 0
        self.x = MARGIN

    def draw_header(self):
        c = self.c
        y = PAGE_H - MARGIN
        # top gold rule
        c.setStrokeColor(GOLD)
        c.setLineWidth(2)
        c.line(MARGIN, y, PAGE_W - MARGIN, y)
        y -= 0.42 * inch
        c.setFont(F_TITLE, 24)
        c.setFillColor(FOREST)
        c.drawCentredString(PAGE_W / 2, y, "Shabbos Village")
        y -= 0.30 * inch
        c.setFont(F_TITLE, 15)
        c.setFillColor(GOLD)
        c.drawCentredString(PAGE_W / 2, y, "Packing List")
        y -= 0.26 * inch
        c.setFont(F_SUB, 10.5)
        c.setFillColor(BODY)
        c.drawCentredString(PAGE_W / 2, y,
                            "Everything you need for a peaceful Shabbos in nature")
        y -= 0.22 * inch
        c.setStrokeColor(GOLD)
        c.setLineWidth(1)
        c.line(MARGIN, y, PAGE_W - MARGIN, y)
        self.top = y - 0.32 * inch
        self.y = self.top

    def col_x(self):
        return MARGIN + self.col * (COL_W + COL_GAP)

    def lowest_y(self):
        """Track the lowest content y across columns so far on this page."""
        return min(getattr(self, "_low0", self.top),
                   getattr(self, "_low1", self.top))

    def ensure_space(self, needed):
        if self.y - needed < 0.75 * inch:
            if self.col == 0:
                self.col = 1
                self.y = self.top
            else:
                self.new_page()

    def section(self, title, items):
        # estimate height of section
        line_h = 0.205 * inch
        est = 0.40 * inch + len(items) * line_h
        # try not to break a section header off alone
        self.ensure_space(min(est, 1.6 * inch))
        x = self.col_x()
        c = self.c
        # section marker (gold square) + title
        c.setFillColor(GOLD)
        c.rect(x, self.y - 1, 5, 12, stroke=0, fill=1)
        c.setFont(F_HEAD, 13)
        c.setFillColor(FOREST)
        c.drawString(x + 12, self.y, title)
        self.y -= 0.10 * inch
        c.setStrokeColor(GOLD)
        c.setLineWidth(0.7)
        c.line(x, self.y, x + COL_W, self.y)
        self.y -= 0.22 * inch
        for item in items:
            note = item.startswith("Note:") or item.startswith("all food") or item.startswith("Eruv")
            text_x = x + 16
            avail = COL_W - 16
            lines = wrap(item, F_BODY, 9.8, avail)
            block_h = len(lines) * line_h
            # column/page break mid-section
            if self.y - block_h < 0.75 * inch:
                if self.col == 0:
                    self.col = 1
                    self.y = self.top
                    x = self.col_x()
                    text_x = x + 16
                else:
                    self.new_page()
                    x = self.col_x()
                    text_x = x + 16
            draw_checkbox(c, x, self.y - 1.5)
            c.setFont(F_BODY, 9.8)
            c.setFillColor(BODY)
            for i, ln in enumerate(lines):
                c.drawString(text_x, self.y - i * line_h, ln)
            self.y -= block_h
        self.y -= 0.18 * inch
        # record low watermark for the current column
        key = "_low%d" % self.col
        setattr(self, key, min(getattr(self, key, self.top), self.y))

    def remember_box(self, items, bottom_y):
        """Full-width callout box anchored so its top sits at bottom_y."""
        c = self.c
        pad = 0.20 * inch
        line_h = 0.215 * inch
        full_w = PAGE_W - 2 * MARGIN
        title_h = 0.32 * inch
        # two-column inner layout for the bullet items
        n = len(items)
        col1 = items[: (n + 1) // 2]
        col2 = items[(n + 1) // 2:]
        rows = max(len(col1), len(col2))
        body_h = rows * line_h
        box_h = title_h + body_h + 2 * pad
        top = bottom_y
        c.setFillColor(HexColor("#F2EEE2"))
        c.setStrokeColor(FOREST)
        c.setLineWidth(1.2)
        c.roundRect(MARGIN, top - box_h, full_w, box_h, 7, stroke=1, fill=1)
        # gold accent marker
        c.setFillColor(GOLD)
        c.rect(MARGIN + pad, top - pad - 12, 5, 14, stroke=0, fill=1)
        c.setFont(F_HEAD, 13)
        c.setFillColor(FOREST)
        c.drawString(MARGIN + pad + 13, top - pad - 10, "Good to Remember")
        c.setFont(F_BODY, 9.8)
        inner_x = [MARGIN + pad, MARGIN + full_w / 2 + pad / 2]
        for ci, col in enumerate([col1, col2]):
            ty = top - pad - title_h
            for it in col:
                c.setFillColor(GOLD)
                c.circle(inner_x[ci] + 2.5, ty + 3, 2, stroke=0, fill=1)
                c.setFillColor(BODY)
                c.drawString(inner_x[ci] + 12, ty, it)
                ty -= line_h
        return top - box_h


def main():
    c = canvas.Canvas(OUT, pagesize=LETTER)
    c.setFont(F_BODY, 10)  # default font -> embedded, avoids stray Helvetica ref
    c.setTitle("Shabbos Village — Packing List")
    c.setAuthor("Shabbos Village")
    c.setSubject("Packing list for a peaceful Shabbos in nature")
    doc = Doc(c)
    doc.new_page(first=True)
    for title, items in SECTIONS:
        doc.section(title, items)
    # Full-width "Good to Remember" box below both columns, on the same page.
    box_top = doc.lowest_y() - 0.20 * inch
    doc.remember_box(REMEMBER, box_top)
    doc.footer()
    c.showPage()
    c.save()
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
