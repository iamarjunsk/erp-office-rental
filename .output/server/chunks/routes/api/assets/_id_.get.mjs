import { d as defineEventHandler, g as getRouterParam } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _id__get = defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const assets = {
    1: {
      id: 1,
      assetNumber: "AST-2024-001",
      name: 'MacBook Pro 14"',
      description: "M3 Pro, 16GB RAM, 512GB SSD - Used for software development and design work",
      category: { id: 1, name: "IT Equipment", code: "IT" },
      subcategory: "Laptop",
      make: "Apple",
      model: "MacBook Pro 14",
      serialNumber: "C02XG1JZJHD3",
      status: "in_use",
      condition: "excellent",
      propertyId: 1,
      property: { id: 1, name: "Cyber Towers", city: "Hyderabad" },
      location: "Floor 3, Desk 42",
      assignedTo: {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        department: "Engineering",
        designation: "Senior Developer"
      },
      purchaseDate: "2024-01-15",
      warrantyExpiry: "2027-01-15",
      purchasePrice: 145e3,
      currentValue: 13e4,
      depreciationMethod: "straight_line",
      annualDepreciation: 29e3,
      usefulLife: 5,
      poId: 2,
      po: { poNumber: "PO-2024-002", title: "MacBook Pro Order" },
      vendorId: 2,
      vendor: {
        id: 2,
        name: "TechWorld Electronics",
        contact: "Priya Sharma"
      },
      qrCode: "https://example.com/assets/AST-2024-001",
      specifications: {
        processor: "Apple M3 Pro",
        ram: "16GB",
        storage: "512GB SSD",
        display: "14.2-inch Liquid Retina XDR",
        color: "Space Gray"
      },
      documents: [
        {
          name: "Purchase Invoice",
          type: "invoice",
          url: "#",
          uploadedAt: "2024-01-20"
        },
        {
          name: "Warranty Card",
          type: "warranty",
          url: "#",
          uploadedAt: "2024-01-20"
        }
      ],
      maintenanceHistory: [
        {
          date: "2024-06-15",
          type: "preventive",
          description: "Software update and cleaning",
          cost: 0,
          performedBy: "IT Team"
        }
      ],
      auditHistory: [
        {
          date: "2024-07-01",
          type: "physical_verification",
          status: "verified",
          notes: "Asset physically verified",
          verifiedBy: "John Doe"
        }
      ],
      transferHistory: [
        {
          date: "2024-01-22",
          fromLocation: "IT Store",
          toLocation: "Floor 3, Desk 42",
          fromUser: null,
          toUser: "Jane Smith",
          transferredBy: "John Doe"
        }
      ],
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-07-01T10:00:00Z"
    },
    2: {
      id: 2,
      assetNumber: "AST-2024-002",
      name: "Ergonomic Executive Chair",
      description: "High-back mesh chair with lumbar support and adjustable armrests",
      category: { id: 2, name: "Furniture", code: "FUR" },
      subcategory: "Seating",
      make: "Herman Miller",
      model: "Aeron",
      serialNumber: "HM-AER-45621",
      status: "in_use",
      condition: "good",
      propertyId: 1,
      property: { id: 1, name: "Cyber Towers", city: "Hyderabad" },
      location: "Floor 5, Desk 12",
      assignedTo: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        department: "Facility",
        designation: "Facility Manager"
      },
      purchaseDate: "2023-06-10",
      warrantyExpiry: "2025-06-10",
      purchasePrice: 85e3,
      currentValue: 68e3,
      depreciationMethod: "straight_line",
      annualDepreciation: 8500,
      usefulLife: 10,
      vendorId: 3,
      vendor: {
        id: 3,
        name: "Office Comfort Furniture",
        contact: "Amit Verma"
      },
      specifications: {
        material: "Mesh",
        color: "Graphite",
        weight_capacity: "150kg",
        adjustments: "Height, Armrest, Lumbar"
      },
      maintenanceHistory: [],
      auditHistory: [
        {
          date: "2024-01-15",
          type: "physical_verification",
          status: "verified",
          verifiedBy: "Admin"
        }
      ],
      transferHistory: [],
      createdAt: "2023-06-15T10:00:00Z"
    }
  };
  const asset = assets[id];
  if (!asset) {
    return {
      id: Number(id),
      assetNumber: `AST-2024-00${id}`,
      name: "Sample Asset",
      status: "available",
      currentValue: 1e4
    };
  }
  return asset;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
