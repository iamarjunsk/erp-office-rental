export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");

    // Mock data - in a real app this would come from a database
    const properties = [
        {
            id: 1,
            code: "PROP-001",
            name: "Cyber Towers",
            type: "commercial",
            city: "Hyderabad",
            state: "Telangana",
            status: "active",
            totalArea: 50000,
            address: "Hitech City Main Rd, Patrika Nagar",
            pincode: "500081",
            buildYear: 2018,
            floors: 10,
            manager: { firstName: "John", lastName: "Doe" },
        },
        {
            id: 2,
            code: "PROP-002",
            name: "Tech Park Plaza",
            type: "coworking",
            city: "Bangalore",
            state: "Karnataka",
            status: "active",
            totalArea: 75000,
            address: "Electronic City Phase 1",
            pincode: "560100",
            buildYear: 2020,
            floors: 15,
            manager: { firstName: "Jane", lastName: "Smith" },
        },
    ];

    const property = properties.find((p) => p.id === Number(id));

    if (!property) {
        // Return a default mock for testing any ID
        return {
            id: Number(id),
            code: `PROP-00${id}`,
            name: "Mock Property",
            type: "commercial",
            city: "Demo City",
            state: "Demo State",
            status: "active",
            totalArea: 10000,
            address: "123 Demo St",
            pincode: "123456",
            buildYear: 2022,
            floors: 5,
            manager: { firstName: "Demo", lastName: "Manager" },
        };
    }

    return property;
});
