const path = require("path");
const aqp = require("api-query-params");
const { fileUpload } = require("../services/fileUpload");
const {
  createCustomer,
  createCustomerArray,
  getAllCustomers,
  updateCustomerById,
} = require("../services/customerServices");
const Customer = require("../models/Customer");
const uploadSingleFile = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files were uploaded." });
  }
  const files = Object.keys(req.files);
  const file = req.files[files[0]];
  const result = await fileUpload(file);
  return res.status(200).json(result);
};

const helloWorld = (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
};

const testEndPoint = async (req, res) => {
  return helloWorld(req, res);
};

const newCustomer = async (req, res) => {
  const { name, city, age, description, address } = req.body;

  let img = req.files.img;
  img = await fileUpload(img);
  console.log(img);
  const imgPath = img.file;
  console.log(imgPath);
  const result = await createCustomer({
    name,
    city,
    age,
    address,
    description,
    img: imgPath,
  });
  return res.status(200).json(result);
};

const newCustomerArray = async (req, res) => {
  const customers = req.body.customers;
  const result = await createCustomerArray(customers);
  return res.status(200).json(result);
};

const allCustomers = async (req, res) => {
  const { filter, limit } = aqp(req.query);
  const page = filter.page || 1;
  delete filter.page;
  const customers = await getAllCustomers(filter, limit, page);
  return res.status(200).json(customers);
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, city, age } = req.body;
  console.log(">>>", id, name, city, age);
  const result = await updateCustomerById(id, { name, city, age });
  //
  return res.status(200).json(result);
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await Customer.deleteById(id);
  return res.status(200).json(result);
};

const deleteCustomersArray = async (req, res) => {
  console.log(">>> req.query", req.query);
  const { ids } = req.body;
  console.log(">>> ", ids);
  const result = await Customer.delete({ _id: { $in: ids } });
  return res.status(200).json(result);
};
module.exports = {
  uploadSingleFile,
  helloWorld,
  testEndPoint,
  newCustomer,
  newCustomerArray,
  allCustomers,
  updateCustomer,
  deleteCustomer,
  deleteCustomersArray,
};
