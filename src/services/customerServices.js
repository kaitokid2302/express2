const Customer = require("../models/Customer");

module.exports = {
  createCustomer: async (data) => {
    try {
      await Customer.create(data);
      return {
        error: false,
        description: "Customer created",
        ...data,
      };
    } catch (error) {
      return {
        error: true,
        description: "Error creating customer",
      };
    }
  },
  createCustomerArray: async (data) => {
    console.log(data);
    try {
      await Customer.insertMany(data);
      return {
        error: false,
        description: "Customer array created",
        data,
      };
    } catch (error) {
      return {
        error: true,
        description: "Can not create customer array",
      };
    }
  },
  getAllCustomers: async (filter, limit, page) => {
    console.log(">>> filter", filter);
    console.log(">>> limit", limit);
    console.log(">>> page", page);
    try {
      if (limit && page) {
        const customers = await Customer.find(filter)
          .limit(limit)
          .skip((page - 1) * limit);
        return {
          error: false,
          description: "All customers",
          data: customers,
        };
      }
    } catch (error) {
      return {
        error: true,
        description: "Error fetching customers",
      };
    }
    const customers = await Customer.find();
    return {
      error: false,
      description: "All customers",
      data: customers,
    };
  },
  updateCustomerById: async (id, data) => {
    try {
      let res = await Customer.findByIdAndUpdate(id, data);
      return {
        error: false,
        description: "Customer updated",
        data: res,
      };
    } catch (error) {
      return {
        error: true,
        description: "Can not update customer",
      };
    }
  },
};
