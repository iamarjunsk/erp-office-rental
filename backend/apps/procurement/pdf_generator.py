from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from io import BytesIO

def generate_po_pdf(po):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=20*mm, leftMargin=20*mm, topMargin=20*mm, bottomMargin=20*mm)
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle('Title', parent=styles['Heading1'], fontSize=16, alignment=TA_CENTER, spaceAfter=20)
    heading_style = ParagraphStyle('Heading', parent=styles['Heading4'], fontSize=11, spaceAfter=5)
    normal_style = ParagraphStyle('Normal', parent=styles['Normal'], fontSize=10)
    
    elements = []
    
    elements.append(Paragraph(f"Purchase Order - {po.po_number}", title_style))
    elements.append(Spacer(1, 10*mm))
    
    info_data = [
        ['Date:', str(po.created_at)[:10]],
        ['PO Number:', po.po_number],
        ['Status:', po.status.replace('_', ' ').title()],
        ['Delivery Date:', str(po.delivery_date)],
    ]
    
    info_table = Table(info_data, colWidths=[80, 150])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 10*mm))
    
    elements.append(Paragraph("<b>Vendor Information</b>", heading_style))
    vendor_info = [
        [f"Name: {po.vendor.name}"],
        [f"Contact: {po.vendor.contact_name}"],
        [f"Email: {po.vendor.contact_email}"],
        [f"Phone: {po.vendor.contact_phone}"],
        [f"Address: {po.delivery_location}"],
    ]
    for row in vendor_info:
        elements.append(Paragraph(row[0], normal_style))
    elements.append(Spacer(1, 10*mm))
    
    elements.append(Paragraph("<b>Order Items</b>", heading_style))
    
    item_headers = [['Item', 'Quantity', 'Unit Price', 'Total']]
    for item in po.items.all():
        item_headers.append([
            item.item_name,
            str(item.quantity),
            f"₹{item.unit_price}",
            f"₹{item.quantity * item.unit_price}"
        ])
    
    item_table = Table(item_headers, colWidths=[200, 70, 90, 90])
    item_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('TOPPADDING', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
    ]))
    elements.append(item_table)
    elements.append(Spacer(1, 10*mm))
    
    summary_data = [
        ['Subtotal:', f"₹{po.subtotal}"],
        [f"Tax ({po.tax_rate}%):", f"₹{po.tax_amount}"],
        ['Shipping:', f"₹{po.shipping_cost}"],
        ['Discount:', f"₹{po.discount}"],
        ['<b>Total:</b>', f'<b>₹{po.total_amount}</b>'],
    ]
    
    summary_table = Table(summary_data, colWidths=[400, 120])
    summary_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 15*mm))
    
    if po.notes:
        elements.append(Paragraph("<b>Notes:</b>", heading_style))
        elements.append(Paragraph(po.notes, normal_style))
    
    doc.build(elements)
    
    pdf = buffer.getvalue()
    
    return pdf
