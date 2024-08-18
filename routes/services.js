import express from 'express';
import { Service } from '../db-utils/models.js';
const serviceRouter = express.Router();

// 1. Get all services that are available
serviceRouter.get('/available', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

serviceRouter.get("/seller/:sellerId", async (req, res) => {
    try {
      const products = await Service.find({
        "sellerInfo.userId": req.params.sellerId,
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// 3. Create a new service
serviceRouter.post('/services', async (req, res) => {
  const { name, description, sku, category, sellerInfo, price } = req.body;
  try {
    const newService = new Service({ name, description, sku, category, sellerInfo, price });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Update an existing service
serviceRouter.put('/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, sku, category, sellerInfo, price } = req.body;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, sku, category, sellerInfo, price },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete an existing servic
serviceRouter.delete('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default serviceRouter;