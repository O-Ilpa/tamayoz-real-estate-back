import express from "express";
import Property from "../models/Property.js";
import verifyMiddleWare from "./verifyMiddleWare.js";
import cloudinary from "cloudinary";
const app = express();

app.use(express.json());
const router = express.Router();

router.post("/add", verifyMiddleWare, async (req, res) => {
  try {
    const {
      propertyId,
      price,
      images,
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
      images: images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
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
    res.json({
      success: false,
      message:
        "error creating property: please enter all the required fields: " + err,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).json({
      success: true,
      message: "Properties Fetched Succefully",
      properties: properties,
    });
  } catch (err) {
    res.json({ success: true, message: "Couldn't Fetch Properties: " + err });
  }
});
router.delete("/del/:id", async (req, res) => {
  try {
    const delPropertyId = req.params.id;
    console.time("mongo-delete");
    await Property.findByIdAndDelete(delPropertyId);
    console.timeEnd("mongo-delete");

    res.json({ success: true, message: "property deleted succefully" });
  } catch (err) {
    res.json({ success: false, message: "err deleting property: " + err });
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    const {
      propertyId,
      price,
      images,
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
      deletedImages,
    } = req.body;
    if (deletedImages && deletedImages.length != 0) {
      for (const public_id of deletedImages) {
        await cloudinary.uploader.destroy(public_id);
      }
    }
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, {
      propertyId,
      price,
      images: images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
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
    });
    res.json({ success: true, message: "updated Succefully" });
  } catch (err) {
    res.json({ success: false, message: "err updating property: " + err });
  }
});
export default router;
