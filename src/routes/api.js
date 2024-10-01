const express = require("express");
const User = require("../models/User");
const {
  uploadSingleFile,
  uploadMultipleFiles,
  helloWorld,
  testEndPoint,
  newCustomerArray,
  allCustomers,
  updateCustomer,
  deleteCustomer,
  deleteCustomersArray,
} = require("../controllers/apiControllers");
const { newCustomer } = require("../controllers/apiControllers");

const router = express.Router();

router.get("/", helloWorld);

router.post("/user", async (req, res) => {
  const { name, city, age } = req.body;
  const user = new User({ name, city, age });
  await User.create(user);
  res.status(201).json({ message: "User created!" });
});

router.get("/user", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
router.get("/test", testEndPoint);
router.post("/customer", newCustomer);
router.post("/customers", newCustomerArray);
router.get("/customers", allCustomers);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);
router.delete("/customers", deleteCustomersArray);

router.post("/file", uploadSingleFile);
module.exports = router;
