import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.js";

import { signup, login } from "./controllers/authController.js";
import { createSoftware, listSoftware } from "./controllers/softwareController.js";
import { submitRequest, approveRequest, getPendingRequests } from "./controllers/requestController.js";
import { authenticate, authorizeRoles } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  });

// Routes
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

// Software routes (Admin only)
app.post("/api/software", authenticate, authorizeRoles("Admin"), createSoftware);
app.get("/api/software", authenticate, listSoftware);

// Access request routes
app.post("/api/requests", authenticate, authorizeRoles("Employee"), submitRequest);
app.patch("/api/requests/:id", authenticate, authorizeRoles("Manager"), approveRequest);
app.get("/api/requests/pending", authenticate, authorizeRoles("Manager"), getPendingRequests);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
