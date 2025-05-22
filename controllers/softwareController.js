import { AppDataSource } from "../data-source.js";
import { Software } from "../models/Software.js";

export const createSoftware = async (req, res) => {
  const softwareRepo = AppDataSource.getRepository(Software);
  const { name, description, accessLevels } = req.body;
  try {
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json(software);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listSoftware = async (_req, res) => {
  const softwareRepo = AppDataSource.getRepository(Software);
  try {
    const list = await softwareRepo.find();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}; 