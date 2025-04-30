import express from "express";
import Property from "../models/Property.js";
import verifyMiddleWare from "./verifyMiddleWare.js";
const app = express();

app.use(express.json());
const router = express.Router();

router.post("/add", verifyMiddleWare, async (req, res) => {
  try {
    const {
      propertyId,
      price,
      imagesUrl,
      yearBuilt,
      type,
      category,
      agent,
      area,
      size,
      floor,
      isLastFloor,
      finishing,
      rooms,
      reception,
      bathrooms,
      meters,
      elevators,
      notes,
    } = req.body;

    const newProperty = new Property({
      creatorId: req.user.id,
      propertyId: propertyId,
      price: parseInt(price),
      images: imagesUrl,
      yearBuilt: parseInt(yearBuilt),
      type: type,
      category: category,
      agent: agent,
      area: area,
      size: parseInt(size),
      floor: parseInt(floor),
      isLastFloor: isLastFloor,
      finishing: finishing,
      rooms: parseInt(rooms),
      reception: parseInt(reception),
      bathrooms: parseInt(bathrooms),
      meters: meters,
      elevators: parseInt(elevators),
      notes: notes,
    });

    await newProperty.save();
    console.log(newProperty);
    res
      .status(200)
      .json({ success: true, message: "property Created Succefully" });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error creating property: " + err });
  }
});

router.get("/get", verifyMiddleWare, async (req, res) => {
  try {
    if (!req.user) {
      const properties = await Property.find({});
      return res.status(200).json({
        success: true,
        message: "Properties Fetched Succefully",
        properties: properties,
      });
    }
    if (req.user.role === "admin") {
      const properties = await Property.find({ creatorId: req.user.id });
      return res.status(200).json({
        success: true,
        message: "Properties Fetched Succefully",
        properties: properties,
      });
    }
  } catch (err) {
    res.json({ success: true, message: "Couldn't Fetch Properties: " + err });
  }
});
export default router;
