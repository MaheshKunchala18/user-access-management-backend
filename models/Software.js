import { EntitySchema } from "typeorm";

export const Software = new EntitySchema({
  name: "Software",
  tableName: "softwares",
  columns: {
    id: { type: "int", primary: true, generated: true },
    name: { type: "varchar" },
    description: { type: "text" },
    accessLevels: { type: "simple-array" },
  },
}); 