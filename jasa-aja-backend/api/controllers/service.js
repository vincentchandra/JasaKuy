const mongoose = require("mongoose");
const Service = require("../models/service");

exports.create_service = async (req, res, next) => {
  try {
    const service = new Service({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      description: req.body.description,
      category: req.body.category,
      servicePicture: req.file.path,
      experience: req.body.experience,
      whatsappNumber: req.body.whatsappNumber,
      dob: req.body.dob,
    });
    const result = await service.save();
    console.log(result);
    res.status(201).json({
      message: "Created Service Successfully",
      service: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

exports.promote = async (req, res, next) => {
  const id = req.body.serviceId;

  try {
    const filter = { _id: id };
    const update = {
      isPromoted: true,
    };

    let service = await Service.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(service);
    res.status(200).json({ message: "Service promoted", service: service });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.get_service = async (req, res, next) => {
  const category = req.params.category;
  const id = req.params.id;
  try {
    const doc = await Service.find({ _id: id, category: category }).exec();
    res.status(200).json({
      product: doc,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

exports.get_services_by_category = async (req, res, next) => {
  const category = req.params.category;
  try {
    const doc = await Service.find({ category: category }).exec();
    doc.reverse();
    doc.sort((x, y) => y.isPromoted - x.isPromoted);
    console.log(doc);
    res.status(200).json({
      product: doc,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

exports.get_all_services = async (req, res, next) => {
  try {
    const doc = await Service.find().exec();
    res.status(200).json({
      product: doc,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
