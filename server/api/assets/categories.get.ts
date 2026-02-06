export default defineEventHandler((event) => {
    return {
        data: [
            {
                id: 1,
                name: "IT Equipment",
                code: "IT",
                description:
                    "Computers, laptops, printers, and other IT hardware",
                assetCount: 4,
                depreciationRate: 20,
            },
            {
                id: 2,
                name: "Furniture",
                code: "FUR",
                description:
                    "Office furniture including desks, chairs, and storage",
                assetCount: 2,
                depreciationRate: 10,
            },
            {
                id: 3,
                name: "HVAC",
                code: "HVAC",
                description:
                    "Heating, ventilation, and air conditioning equipment",
                assetCount: 1,
                depreciationRate: 10,
            },
            {
                id: 4,
                name: "Security",
                code: "SEC",
                description: "CCTV, access control, and security equipment",
                assetCount: 1,
                depreciationRate: 14,
            },
            {
                id: 5,
                name: "Electrical",
                code: "ELE",
                description: "UPS, generators, and electrical equipment",
                assetCount: 0,
                depreciationRate: 10,
            },
            {
                id: 6,
                name: "Vehicles",
                code: "VEH",
                description: "Company vehicles and transportation",
                assetCount: 0,
                depreciationRate: 15,
            },
        ],
    };
});
