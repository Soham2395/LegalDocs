from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import Color, black, lightgrey
import io
from typing import Dict

# Simple text templates with placeholders in {{key}} format
WILL_TEMPLATE = (
    "Last Will and Testament\n\n"
    "I, {{full_name}}, born on {{dob}}, residing at {{address}}, declare this to be my Last Will and Testament, executed on {{execution_date}}.\n\n"
    "Beneficiaries: {{beneficiaries}}.\n"
    "Executor: {{executor}}.\n\n"
    "Further Provisions: {{provisions}}\n\n"
    "Signed: __________________________\n"
)

POA_TEMPLATE = (
    "Power of Attorney\n\n"
    "I, {{principal_name}}, of {{principal_address}}, appoint {{attorney_name}} of {{attorney_address}} as my Attorney-in-Fact.\n\n"
    "Scope of authority: {{scope}}. Effective on {{effective_date}}.\n\n"
    "Additional terms: {{additional_terms}}\n\n"
    "Principal Signature: __________________________\n"
)


def fill_template(template: str, data: Dict[str, str]) -> str:
    out = template
    for k, v in data.items():
        out = out.replace(f"{{{{{k}}}}}", str(v))
    return out


def draw_multiline_text(c: canvas.Canvas, text: str, x: float, y: float, max_width: float, leading: float = 14):
    # Simple word wrap
    from reportlab.pdfbase.pdfmetrics import stringWidth
    lines = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        current = ""
        for w in words:
            trial = (current + " " + w).strip()
            if stringWidth(trial, "Helvetica", 11) < max_width:
                current = trial
            else:
                lines.append(current)
                current = w
        lines.append(current)
        lines.append("")  # paragraph spacing

    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def add_watermark(c: canvas.Canvas, text: str = "PREVIEW – Not for Download"):
    c.saveState()
    c.setFont("Helvetica-Bold", 48)
    c.setFillColor(lightgrey)
    c.translate(300, 400)
    c.rotate(30)
    c.drawCentredString(0, 0, text)
    c.restoreState()


def build_pdf_from_template(doc_type: str, data: Dict[str, str], watermark: bool = False) -> bytes:
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=LETTER)
    width, height = LETTER

    # Title
    c.setFont("Helvetica-Bold", 18)
    title = "Last Will and Testament" if doc_type == "WILL" else "Power of Attorney"
    c.drawCentredString(width / 2, height - 1 * inch, title)

    c.setFont("Helvetica", 11)
    template = WILL_TEMPLATE if doc_type == "WILL" else POA_TEMPLATE
    filled = fill_template(template, data)

    y = height - 1.5 * inch
    left_margin = 1 * inch
    right_margin = width - 1 * inch
    max_width = right_margin - left_margin

    y = draw_multiline_text(c, filled, left_margin, y, max_width, leading=14)

    if watermark:
        add_watermark(c)

    c.showPage()
    c.save()
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
