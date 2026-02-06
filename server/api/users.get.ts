export default defineEventHandler((event) => {
    return {
        data: [
            {
                id: 1,
                firstName: "Super",
                lastName: "Admin",
                email: "admin@officeerp.com",
                role: "super_admin",
                status: "active",
                lastLoginAt: "2026-02-05 10:30 AM",
            },
            {
                id: 2,
                firstName: "Property",
                lastName: "Manager",
                email: "manager@officeerp.com",
                role: "property_manager",
                status: "active",
                lastLoginAt: "2026-02-05 09:15 AM",
            },
            {
                id: 3,
                firstName: "John",
                lastName: "Doe",
                email: "john@techsolutions.com",
                role: "tenant_admin",
                status: "active",
                lastLoginAt: "2026-02-04 04:20 PM",
            },
            {
                id: 4,
                firstName: "Jane",
                lastName: "Smith",
                email: "jane@innovatelabs.com",
                role: "tenant_member",
                status: "active",
                lastLoginAt: "2026-02-03 11:45 AM",
            },
            {
                id: 5,
                firstName: "Finance",
                lastName: "Manager",
                email: "finance@officeerp.com",
                role: "finance_manager",
                status: "active",
                lastLoginAt: "2026-02-05 08:00 AM",
            },
        ],
    };
});
