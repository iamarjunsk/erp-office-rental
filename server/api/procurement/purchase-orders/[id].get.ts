export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");

    const orders = {
        1: {
            id: 1,
            poNumber: "PO-2024-001",
            prId: 3,
            pr: {
                id: 3,
                prNumber: "PR-2024-003",
                title: "Cleaning Supplies Monthly",
            },
            vendorId: 1,
            vendor: {
                id: 1,
                name: "CleanPro Supplies",
                contact: {
                    name: "Rajesh Kumar",
                    email: "sales@cleanpro.com",
                    phone: "+91-9876543210",
                },
                address:
                    "45, Industrial Area Phase 2, Gurugram, Haryana 122001",
                gstNumber: "06ABCDE1234F1Z5",
            },
            title: "Cleaning Supplies Order - Feb 2024",
            description:
                "Monthly cleaning and sanitation supplies for facility maintenance",
            terms: "Net 30 days from invoice date",
            paymentTerms: "100% on delivery",
            deliveryDate: "2024-02-25",
            deliveryLocation: "Tech Park Plaza, Warehouse, Ground Floor",
            deliveryInstructions:
                "Deliver between 9 AM - 5 PM. Contact warehouse manager on arrival.",
            subtotal: 32000,
            taxRate: 18,
            taxAmount: 5760,
            shippingCost: 500,
            discount: 1000,
            totalAmount: 37260,
            status: "sent",
            preparedBy: { id: 1, firstName: "John", lastName: "Doe" },
            approvedBy: { id: 2, firstName: "Jane", lastName: "Smith" },
            approvedAt: "2024-02-08T10:00:00Z",
            sentAt: "2024-02-08T14:00:00Z",
            items: [
                {
                    id: 1,
                    itemName: "Floor Cleaner (Concentrated)",
                    description: "Industrial grade floor cleaner",
                    quantity: 20,
                    unit: "ltr",
                    unitPrice: 450,
                    totalPrice: 9000,
                    receivedQuantity: 0,
                    pendingQuantity: 20,
                },
                {
                    id: 2,
                    itemName: "Hand Sanitizer (70% Alcohol)",
                    description: "Bulk sanitizer for dispensers",
                    quantity: 50,
                    unit: "ltr",
                    unitPrice: 280,
                    totalPrice: 14000,
                    receivedQuantity: 0,
                    pendingQuantity: 50,
                },
                {
                    id: 3,
                    itemName: "Paper Towels (Pack of 6)",
                    description: "Premium quality paper towels",
                    quantity: 100,
                    unit: "box",
                    unitPrice: 90,
                    totalPrice: 9000,
                    receivedQuantity: 0,
                    pendingQuantity: 100,
                },
            ],
            history: [
                {
                    action: "Created",
                    user: "John Doe",
                    timestamp: "2024-02-07T09:00:00Z",
                },
                {
                    action: "Submitted for Approval",
                    user: "John Doe",
                    timestamp: "2024-02-07T09:30:00Z",
                },
                {
                    action: "Approved",
                    user: "Jane Smith",
                    timestamp: "2024-02-08T10:00:00Z",
                },
                {
                    action: "Sent to Vendor",
                    user: "John Doe",
                    timestamp: "2024-02-08T14:00:00Z",
                    notes: "Email sent to sales@cleanpro.com",
                },
            ],
            createdAt: "2024-02-07T09:00:00Z",
        },
        2: {
            id: 2,
            poNumber: "PO-2024-002",
            prId: 2,
            pr: {
                id: 2,
                prNumber: "PR-2024-002",
                title: "IT Equipment Refresh",
            },
            vendorId: 2,
            vendor: {
                id: 2,
                name: "TechWorld Electronics",
                contact: {
                    name: "Priya Sharma",
                    email: "orders@techworld.com",
                    phone: "+91-9876543211",
                },
                address: "B-12, Nehru Place, New Delhi 110019",
                gstNumber: "07FGHIJ5678K2L6",
            },
            title: "MacBook Pro Order",
            terms: "Net 15 days, 50% Advance Payment",
            deliveryDate: "2024-03-01",
            deliveryLocation: "Cyber Towers, IT Department, Floor 3",
            subtotal: 775000,
            taxRate: 18,
            taxAmount: 139500,
            shippingCost: 0,
            discount: 25000,
            totalAmount: 889500,
            status: "acknowledged",
            preparedBy: { id: 2, firstName: "Jane", lastName: "Smith" },
            approvedBy: { id: 1, firstName: "John", lastName: "Doe" },
            items: [
                {
                    id: 4,
                    itemName: 'MacBook Pro 14" M3 Pro',
                    description: "16GB RAM, 512GB SSD, Space Gray",
                    quantity: 5,
                    unit: "pcs",
                    unitPrice: 145000,
                    totalPrice: 725000,
                    receivedQuantity: 0,
                    pendingQuantity: 5,
                    createAssetOnReceipt: true,
                },
                {
                    id: 5,
                    itemName: "USB-C Thunderbolt Dock",
                    description: "CalDigit TS4 Dock",
                    quantity: 5,
                    unit: "pcs",
                    unitPrice: 10000,
                    totalPrice: 50000,
                    receivedQuantity: 0,
                    pendingQuantity: 5,
                    createAssetOnReceipt: true,
                },
            ],
            history: [
                {
                    action: "Created",
                    user: "Jane Smith",
                    timestamp: "2024-02-06T11:00:00Z",
                },
                {
                    action: "Approved",
                    user: "John Doe",
                    timestamp: "2024-02-06T16:00:00Z",
                },
                {
                    action: "Sent to Vendor",
                    user: "Jane Smith",
                    timestamp: "2024-02-06T17:00:00Z",
                },
                {
                    action: "Acknowledged by Vendor",
                    user: "System",
                    timestamp: "2024-02-07T10:00:00Z",
                    notes: "Vendor confirmed order. Expected delivery on time.",
                },
            ],
            createdAt: "2024-02-06T11:00:00Z",
        },
    };

    const po = orders[id as keyof typeof orders];
    if (!po) {
        return {
            id: Number(id),
            poNumber: `PO-2024-00${id}`,
            title: "Sample Purchase Order",
            status: "draft",
            totalAmount: 50000,
            items: [],
        };
    }

    return po;
});
