import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Software } from "./Software.js";

export const AccessRequest = new EntitySchema({
  name: "AccessRequest",
  tableName: "access_requests",
  columns: {
    id: { type: "int", primary: true, generated: true },
    accessType: { type: "varchar" },
    reason: { type: "text" },
    status: { type: "varchar", default: "Pending" },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      eager: true,
      joinColumn: true,
    },
    software: {
      type: "many-to-one",
      target: "Software",
      eager: true,
      joinColumn: true,
    },
  },
}); 