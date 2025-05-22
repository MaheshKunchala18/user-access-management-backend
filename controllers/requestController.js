import { AppDataSource } from "../data-source.js";
import { AccessRequest } from "../models/AccessRequest.js";
import { Software } from "../models/Software.js";
import { User } from "../models/User.js";

export const submitRequest = async (req, res) => {
  const requestRepo = AppDataSource.getRepository(AccessRequest);
  const softwareRepo = AppDataSource.getRepository(Software);
  const userRepo = AppDataSource.getRepository(User);
  const { softwareId, accessType, reason } = req.body;
  const userId = req.user.id; // set by auth middleware
  try {
    const software = await softwareRepo.findOne({ where: { id: softwareId } });
    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }
    const user = await userRepo.findOne({ where: { id: userId } });
    const request = requestRepo.create({ user, software, accessType, reason });
    await requestRepo.save(request);
    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveRequest = async (req, res) => {
  const requestRepo = AppDataSource.getRepository(AccessRequest);
  const { id } = req.params;
  const { status } = req.body; // Approved or Rejected
  try {
    const request = await requestRepo.findOne({ where: { id } });
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.status = status;
    await requestRepo.save(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPendingRequests = async (_req, res) => {
  const requestRepo = AppDataSource.getRepository(AccessRequest);
  try {
    const requests = await requestRepo.find({ where: { status: "Pending" } });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}; 