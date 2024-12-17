import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import Pin from "../models/pinModel.js";

export const createPin = async (req, res) => {
  try {
    const { title, pin } = req.body;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = getDataUrl(file);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Pin.create({
      title,
      pin,
      image: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
      owner: req.user._id,
    });

    res.json({
      message: "Pin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to upload file",
      error: error.message,
    });
  }
};

export const getAllPins = async (req, res) => {
  try {
    // here we are fetching all the pins
    const pins = await Pin.find().sort({ createdat: -1 });
    res.json(pins);
  } catch (error) {
    res.status(500).json({
      message: "Unable to upload file",
      error: error.message,
    });
  }
};

export const getSinglePin = async (req, res) => {
  try {
    // here we are fetching single pin
    const pin = await Pin.findById(req.params.id).populate(
      "owner",
      "-password"
    );
    res.json(pin);
  } catch (error) {
    res.status(500).json({
      message: "Unable to upload file",
      error: error.message,
    });
  }
};

export const commentOnPin = async (req, res) => {
  try {
    console.log(req.body);

    const pin = await Pin.findById(req.params.id);
    if (!pin) return res.status(400).json({ message: "No pin with this id " });

    pin.comments.push({
      user: req.user._id,
      name: req.user.name,
      comment: req.body.comment,
    });

    await pin.save();

    res.json({ message: "Comment Added!" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Unable to add comment" });
  }
};

export const deletePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(400).json({ message: "No pin found with this id" });
    }

    // Ensure the logged-in user is the owner of the pin
    if (pin.owner.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    // Delete the image from Cloudinary
    try {
      await cloudinary.v2.uploader.destroy(pin.image.id);
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);
      return res
        .status(500)
        .json({ message: "Error deleting image from Cloudinary" });
    }

    await pin.deleteOne();

    res.json({ message: "Pin deleted" });
  } catch (error) {
    res.status(500).json({ message: "Pin not deleted", error: error.message });
  }
};

export const updatePin = async (req, res) => {
  try {

    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(404).json({ message: "No pin found with this ID" });
    }

    if (pin.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    pin.title = req.body.title || pin.title;
    pin.pin = req.body.pin || pin.pin;

    const updatedPin = await pin.save();

    res.status(200).json({ message: "Pin updated successfully!", pin: updatedPin });
  } catch (error) {
    res.status(500).json({ message: "Pin not updated", error: error.message });
  }
};
