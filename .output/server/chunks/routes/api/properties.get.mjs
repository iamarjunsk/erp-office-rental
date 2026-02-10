import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const properties_get = defineEventHandler((event) => {
  return {
    data: [
      {
        id: 1,
        code: "PROP-001",
        name: "Cyber Towers",
        type: "commercial",
        city: "Hyderabad",
        state: "Telangana",
        totalArea: 5e4,
        status: "active",
        manager: { firstName: "John", lastName: "Doe" }
      },
      {
        id: 2,
        code: "PROP-002",
        name: "Tech Park Plaza",
        type: "coworking",
        city: "Bangalore",
        state: "Karnataka",
        totalArea: 75e3,
        status: "active",
        manager: { firstName: "Jane", lastName: "Smith" }
      },
      {
        id: 3,
        code: "PROP-003",
        name: "Innovation Hub",
        type: "mixed_use",
        city: "Mumbai",
        state: "Maharashtra",
        totalArea: 12e4,
        status: "under_renovation",
        manager: { firstName: "Robert", lastName: "Brown" }
      },
      {
        id: 4,
        code: "PROP-004",
        name: "Downtown Heights",
        type: "commercial",
        city: "New Delhi",
        state: "Delhi",
        totalArea: 45e3,
        status: "active",
        manager: null
      },
      {
        id: 5,
        code: "PROP-005",
        name: "Seaside Complex",
        type: "commercial",
        city: "Chennai",
        state: "Tamil Nadu",
        totalArea: 6e4,
        status: "inactive",
        manager: { firstName: "Emily", lastName: "Davis" }
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 5,
      totalPages: 1
    }
  };
});

export { properties_get as default };
//# sourceMappingURL=properties.get.mjs.map
