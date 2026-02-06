export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");

    const requisitions = {
        1: {
            id: 1,
            prNumber: "PR-2024-001",
            title: "Office Furniture Q1",
            description:
                "Procurement of office chairs and desks for new hires in the development department. This includes ergonomic furniture to ensure employee comfort and productivity.",
            requestedBy: {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                department: "Facility",
            },
            department: "Facility",
            propertyId: 1,
            property: { id: 1, name: "Cyber Towers", city: "Hyderabad" },
            priority: "high",
            category: "furniture",
            requiredDate: "2024-03-15",
            status: "pending_approval",
            totalEstimatedAmount: 250000,
            items: [
                {
                    id: 1,
                    itemName: "Executive Ergonomic Chair",
                    description: "High-back mesh chair with lumbar support",
                    quantity: 10,
                    unit: "pcs",
                    estimatedUnitPrice: 15000,
                    totalEstimatedPrice: 150000,
                    specifications: { brand: "Herman Miller", color: "Black" },
                },
                {
                    id: 2,
                    itemName: "Work Desk with Storage",
                    description: "L-shaped desk with drawer unit",
                    quantity: 10,
                    unit: "pcs",
                    estimatedUnitPrice: 10000,
                    totalEstimatedPrice: 100000,
                    specifications: {
                        material: "MDF with laminate",
                        dimensions: "160x80 cm",
                    },
                },
            ],
            approver: {
                id: 2,
                firstName: "Jane",
                lastName: "Smith",
                email: "jane@example.com",
            },
            requestedAt: "2024-02-01T10:00:00Z",
            createdAt: "2024-02-01T10:00:00Z",
            updatedAt: "2024-02-01T10:00:00Z",
            history: [
                {
                    action: "Created",
                    user: "John Doe",
                    timestamp: "2024-02-01T10:00:00Z",
                    notes: "Initial requisition created",
                },
                {
                    action: "Submitted for Approval",
                    user: "John Doe",
                    timestamp: "2024-02-01T10:05:00Z",
                    notes: "Sent to Jane Smith for approval",
                },
            ],
        },
        2: {
            id: 2,
            prNumber: "PR-2024-002",
            title: "IT Equipment Refresh",
            description:
                "Replacement of aging laptops for development team to support new project requirements",
            requestedBy: {
                id: 2,
                firstName: "Jane",
                lastName: "Smith",
                email: "jane@example.com",
                department: "IT",
            },
            department: "IT",
            propertyId: 1,
            property: { id: 1, name: "Cyber Towers", city: "Hyderabad" },
            priority: "urgent",
            category: "it_hardware",
            requiredDate: "2024-02-28",
            status: "approved",
            totalEstimatedAmount: 800000,
            items: [
                {
                    id: 3,
                    itemName: 'MacBook Pro 14" M3 Pro',
                    description: "16GB RAM, 512GB SSD",
                    quantity: 5,
                    unit: "pcs",
                    estimatedUnitPrice: 150000,
                    totalEstimatedPrice: 750000,
                },
                {
                    id: 4,
                    itemName: "USB-C Thunderbolt Dock",
                    description: "Multi-port dock with power delivery",
                    quantity: 5,
                    unit: "pcs",
                    estimatedUnitPrice: 10000,
                    totalEstimatedPrice: 50000,
                },
            ],
            approver: {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
            },
            approverId: 1,
            approvedAt: "2024-02-05T14:30:00Z",
            approvalNotes: "Approved. Please proceed with vendor quotations.",
            requestedAt: "2024-02-03T09:00:00Z",
            createdAt: "2024-02-03T09:00:00Z",
            history: [
                {
                    action: "Created",
                    user: "Jane Smith",
                    timestamp: "2024-02-03T09:00:00Z",
                },
                {
                    action: "Submitted",
                    user: "Jane Smith",
                    timestamp: "2024-02-03T09:05:00Z",
                },
                {
                    action: "Approved",
                    user: "John Doe",
                    timestamp: "2024-02-05T14:30:00Z",
                    notes: "Approved. Please proceed with vendor quotations.",
                },
            ],
        },
    };

    const pr = requisitions[id as keyof typeof requisitions];
    if (!pr) {
        return {
            id: Number(id),
            prNumber: `PR-2024-00${id}`,
            title: "Sample Requisition",
            status: "draft",
            totalEstimatedAmount: 50000,
            items: [],
        };
    }

    return pr;
});
