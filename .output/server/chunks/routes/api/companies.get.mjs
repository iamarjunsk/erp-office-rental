import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const companies_get = defineEventHandler((event) => {
  return {
    data: [
      {
        id: 1,
        name: "TechCorp Solutions",
        legalName: "TechCorp Solutions Pvt Ltd",
        type: "technology",
        industry: "Software Development",
        gstin: "29AAAAA0000A1Z5",
        city: "Bangalore",
        state: "Karnataka",
        creditScore: 85,
        status: "active"
      },
      {
        id: 2,
        name: "Global Logistics",
        legalName: "Global Logistics India Ltd",
        type: "logistics",
        industry: "Supply Chain",
        gstin: "27BBBBB1111B1Z6",
        city: "Mumbai",
        state: "Maharashtra",
        creditScore: 72,
        status: "active"
      },
      {
        id: 3,
        name: "Innovate Design",
        legalName: "Innovate Design Studio LLP",
        type: "creative",
        industry: "Design & Media",
        gstin: "07CCCCC2222C1Z7",
        city: "New Delhi",
        state: "Delhi",
        creditScore: 90,
        status: "active"
      },
      {
        id: 4,
        name: "Green Energy Systems",
        legalName: "Green Energy Systems Pvt Ltd",
        type: "energy",
        industry: "Renewable Energy",
        gstin: "33DDDDD3333D1Z8",
        city: "Chennai",
        state: "Tamil Nadu",
        creditScore: 65,
        status: "inactive"
      },
      {
        id: 5,
        name: "FinTech Hub",
        legalName: "FinTech Hub Services Ltd",
        type: "finance",
        industry: "Financial Services",
        gstin: "36EEEEE4444E1Z9",
        city: "Hyderabad",
        state: "Telangana",
        creditScore: 45,
        status: "active"
      }
    ]
  };
});

export { companies_get as default };
//# sourceMappingURL=companies.get.mjs.map
