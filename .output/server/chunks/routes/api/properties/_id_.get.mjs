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
  const properties = [
    {
      id: 1,
      code: "PROP-001",
      name: "Cyber Towers",
      type: "commercial",
      city: "Hyderabad",
      state: "Telangana",
      status: "active",
      totalArea: 5e4,
      address: "Hitech City Main Rd, Patrika Nagar",
      pincode: "500081",
      buildYear: 2018,
      floors: 10,
      manager: { firstName: "John", lastName: "Doe" }
    },
    {
      id: 2,
      code: "PROP-002",
      name: "Tech Park Plaza",
      type: "coworking",
      city: "Bangalore",
      state: "Karnataka",
      status: "active",
      totalArea: 75e3,
      address: "Electronic City Phase 1",
      pincode: "560100",
      buildYear: 2020,
      floors: 15,
      manager: { firstName: "Jane", lastName: "Smith" }
    }
  ];
  const property = properties.find((p) => p.id === Number(id));
  if (!property) {
    return {
      id: Number(id),
      code: `PROP-00${id}`,
      name: "Mock Property",
      type: "commercial",
      city: "Demo City",
      state: "Demo State",
      status: "active",
      totalArea: 1e4,
      address: "123 Demo St",
      pincode: "123456",
      buildYear: 2022,
      floors: 5,
      manager: { firstName: "Demo", lastName: "Manager" }
    };
  }
  return property;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
