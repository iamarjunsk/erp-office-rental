"""
PDF Generator for Invoices
"""
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from datetime import datetime


def generate_invoice_pdf(invoice):
    """Generate a professional PDF invoice"""
    buffer = BytesIO()
    
    # Create PDF document
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=20*mm,
        leftMargin=20*mm,
        topMargin=20*mm,
        bottomMargin=20*mm
    )
    
    # Container for elements
    elements = []
    
    # Styles
    styles = getSampleStyleSheet()
    
    # Header Style
    header_style = ParagraphStyle(
        'HeaderStyle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=20,
        alignment=TA_CENTER
    )
    
    # Subheader Style
    subheader_style = ParagraphStyle(
        'SubheaderStyle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=10
    )
    
    # Normal Style
    normal_style = ParagraphStyle(
        'NormalStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#475569')
    )
    
    # Right aligned style
    right_style = ParagraphStyle(
        'RightStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#475569'),
        alignment=TA_RIGHT
    )
    
    # Status color mapping
    status_colors = {
        'draft': colors.gray,
        'sent': colors.blue,
        'paid': colors.green,
        'overdue': colors.red,
        'partial': colors.orange,
        'cancelled': colors.grey
    }
    
    # Company Header
    elements.append(Paragraph("INVOICE", header_style))
    elements.append(Spacer(1, 10))
    
    # Invoice Info Table
    invoice_info_data = [
        ['Invoice Number:', invoice.invoice_number, '', 'Status:', invoice.status.upper()],
        ['Invoice Date:', invoice.invoice_date.strftime('%d %b %Y'), '', 'Due Date:', invoice.due_date.strftime('%d %b %Y')],
    ]
    
    # Add billing period
    if invoice.period_start and invoice.period_end:
        invoice_info_data.append([
            'Billing Period:', 
            f"{invoice.period_start.strftime('%d %b %Y')} - {invoice.period_end.strftime('%d %b %Y')}",
            '', '', ''
        ])
    
    invoice_info_table = Table(invoice_info_data, colWidths=[30*mm, 50*mm, 30*mm, 25*mm, 35*mm])
    invoice_info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#64748b')),
        ('TEXTCOLOR', (1, 0), (1, -1), colors.HexColor('#1e293b')),
        ('TEXTCOLOR', (3, 0), (3, -1), colors.HexColor('#64748b')),
        ('TEXTCOLOR', (4, 0), (4, 0), status_colors.get(invoice.status, colors.black)),
        ('FONTNAME', (4, 0), (4, 0), 'Helvetica-Bold'),
        ('ALIGN', (3, 0), (-1, -1), 'RIGHT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(invoice_info_table)
    elements.append(Spacer(1, 20))
    
    # Bill To Section
    elements.append(Paragraph("BILL TO", subheader_style))
    bill_to_data = [
        [invoice.company.name],
    ]
    
    if hasattr(invoice.company, 'address') and invoice.company.address:
        bill_to_data.append([invoice.company.address])
    if hasattr(invoice.company, 'city') and invoice.company.city:
        city_line = invoice.company.city
        if hasattr(invoice.company, 'state') and invoice.company.state:
            city_line += f", {invoice.company.state}"
        if hasattr(invoice.company, 'pincode') and invoice.company.pincode:
            city_line += f" - {invoice.company.pincode}"
        bill_to_data.append([city_line])
    if hasattr(invoice.company, 'gstin') and invoice.company.gstin:
        bill_to_data.append([f"GSTIN: {invoice.company.gstin}"])
    
    bill_to_table = Table(bill_to_data, colWidths=[150*mm])
    bill_to_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (0, 0), 12),
        ('TEXTCOLOR', (0, 0), (0, 0), colors.HexColor('#1e293b')),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#475569')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(bill_to_table)
    elements.append(Spacer(1, 20))
    
    # Invoice Items Table
    elements.append(Paragraph("INVOICE ITEMS", subheader_style))
    
    # Table header
    items_data = [['Description', 'Quantity', 'Unit Price', 'Total']]
    
    # Add items
    for item in invoice.items.all():
        items_data.append([
            item.description,
            str(item.quantity),
            f"₹{item.unit_price:,.2f}",
            f"₹{item.line_total:,.2f}"
        ])
    
    items_table = Table(items_data, colWidths=[80*mm, 25*mm, 35*mm, 35*mm])
    items_table.setStyle(TableStyle([
        # Header styling
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f1f5f9')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#1e293b')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        
        # Body styling
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#475569')),
        ('ALIGN', (0, 1), (0, -1), 'LEFT'),
        ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        
        # Grid
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, colors.HexColor('#e2e8f0')),
        ('LINEBELOW', (0, -1), (-1, -1), 1, colors.HexColor('#334155')),
    ]))
    elements.append(items_table)
    elements.append(Spacer(1, 20))
    
    # Totals Section
    totals_data = [
        ['Subtotal:', f"₹{invoice.subtotal:,.2f}"],
        [f"GST ({invoice.gst_rate}%):", f"₹{invoice.tax_amount:,.2f}"],
    ]
    
    if invoice.discount_amount > 0:
        totals_data.append(['Discount:', f"-₹{invoice.discount_amount:,.2f}"])
    
    totals_data.extend([
        ['Total Amount:', f"₹{invoice.total_amount:,.2f}"],
        ['Amount Paid:', f"₹{invoice.amount_paid:,.2f}"],
        ['Balance Due:', f"₹{invoice.balance_due:,.2f}"],
    ])
    
    totals_table = Table(totals_data, colWidths=[130*mm, 45*mm])
    totals_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -3), 'Helvetica'),
        ('FONTNAME', (0, -3), (-1, -3), 'Helvetica-Bold'),
        ('FONTNAME', (0, -2), (-1, -2), 'Helvetica'),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (-2, -1), colors.HexColor('#64748b')),
        ('TEXTCOLOR', (-1, 0), (-1, -1), colors.HexColor('#1e293b')),
        ('TEXTCOLOR', (-1, -1), (-1, -1), colors.red if invoice.balance_due > 0 else colors.green),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (-1, 0), (-1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, -3), (-1, -3), 12),
        ('LINEABOVE', (0, -3), (-1, -3), 1, colors.HexColor('#334155')),
    ]))
    elements.append(totals_table)
    elements.append(Spacer(1, 30))
    
    # Terms and Notes
    if invoice.terms:
        elements.append(Paragraph("TERMS & CONDITIONS", subheader_style))
        elements.append(Paragraph(invoice.terms, normal_style))
        elements.append(Spacer(1, 15))
    
    if invoice.notes:
        elements.append(Paragraph("NOTES", subheader_style))
        elements.append(Paragraph(invoice.notes, normal_style))
        elements.append(Spacer(1, 15))
    
    # Footer
    elements.append(Spacer(1, 30))
    footer_style = ParagraphStyle(
        'FooterStyle',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#94a3b8'),
        alignment=TA_CENTER
    )
    elements.append(Paragraph("Thank you for your business!", footer_style))
    elements.append(Paragraph("This is a computer-generated invoice and does not require a signature.", footer_style))
    
    # Build PDF
    doc.build(elements)
    
    # Get PDF value
    pdf = buffer.getvalue()
    buffer.close()
    
    return BytesIO(pdf)
