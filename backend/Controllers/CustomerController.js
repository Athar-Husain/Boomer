import Coupon from "../Models/Coupon.model.js";
import Customer from "../Models/Customer.model.js";
import asyncHandler from "express-async-handler";
import { sendCouponsOnWhatsApp } from "./ServicesController.js";
// import { sendCouponToWhatsApp } from "./CouponController.js";

export const getCustomerCoupons2 = asyncHandler(async (req, res) => {
  // console.log("getCustomerCoupons hitted");
  // const { phoneNumber } = req.params;
  const { phoneNumber } = req.query;

  try {
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const counpons = customer.coupons;
    res.status(200).json(counpons);
    // res.status(200).json({ coupons: customer.coupons });
  } catch (error) {
    console.log("Error in the getCustomerCoupons", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const getCustomerCoupons = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.query;

  try {
    // Fetch the customer by phoneNumber
    const customer = await Customer.findOne({ phoneNumber }).populate({
      path: "coupons",
      match: {
        isRedeemed: false, // Only include coupons that are not redeemed
        isConsidered: true, // Only include coupons that are considered valid
      },
    });

    // If no customer is found, return a 404 error
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Get the filtered coupons
    const coupons = customer.coupons;

    // Return the coupons
    res.status(200).json(coupons);
  } catch (error) {
    console.log("Error in the getCustomerCoupons:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// export const assignCouponsToCustomer = asyncHandler(async (req, res) => {
//   const { phoneNumber, name } = req.body;

//   try {
//     // Check if name is provided for new customers
//     if (!name && !(await Customer.findOne({ phoneNumber }))) {
//       return res
//         .status(400)
//         .json({ message: "Name is required for new customers." });
//     }

//     let customer = await Customer.findOne({ phoneNumber });

//     // If customer doesn't exist, create a new customer
//     if (!customer) {
//       customer = new Customer({
//         phoneNumber,
//         name, // If name is provided, use it
//         coupons: [], // Initialize with an empty coupon array
//       });
//       await customer.save();
//       console.log("New customer created:", customer);
//     }

//     // Fetch available coupons
//     const availableCoupons = await Coupon.find({ customer: null });

//     if (availableCoupons.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No available coupons. Please add coupons first." });
//     }

//     // Assign first 3 available coupons to customer
//     const assignedCoupons = availableCoupons.slice(0, 3);
//     assignedCoupons.forEach((coupon) => {
//       const today = new Date();
//       const expiryDate = new Date(
//         today.setDate(today.getDate() + coupon.expiresIn)
//       );

//       coupon.expiryDate = expiryDate;

//       console.log("Coupon Expiry Date in Assign Coupons", coupon.expiryDate);
//       // coupon.customer = customer._id; // Associate the coupon with the customer
//       customer.coupons.push(coupon._id); // Add coupon to customer coupons list
//     });

//     // Save the updated coupons and customer
//     await Promise.all(assignedCoupons.map((coupon) => coupon.save()));
//     await customer.save();

//     // Send coupons to the customer's WhatsApp
//     // await sendCouponToWhatsApp(customer.phoneNumber, assignedCoupons);
//     await sendCouponsOnMobile(customer.phoneNumber, assignedCoupons);

//     res.status(200).json({
//       message: "Coupons assigned and sent to customer",
//       coupons: assignedCoupons,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// export const assignCouponsToCustomer = asyncHandler(async (req, res) => {
//   const { phoneNumber, name } = req.body;

//   try {
//     // Check if name is provided for new customers
//     if (!name && !(await Customer.findOne({ phoneNumber }))) {
//       return res
//         .status(400)
//         .json({ message: "Name is required for new customers." });
//     }

//     let customer = await Customer.findOne({ phoneNumber });

//     // If customer doesn't exist, create a new customer
//     if (!customer) {
//       customer = new Customer({
//         phoneNumber,
//         name, // If name is provided, use it
//         coupons: [], // Initialize with an empty coupon array
//       });
//       await customer.save();
//       console.log("New customer created:", customer);
//     }

//     // Fetch available coupons
//     const availableCoupons = await Coupon.find({ customer: null });

//     if (availableCoupons.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No available coupons. Please add coupons first." });
//     }

//     // Assign first 3 available coupons to customer
//     const assignedCoupons = availableCoupons.slice(0, 3);

//     // Iterate through each coupon and assign to the customer
//     for (let coupon of assignedCoupons) {
//       const today = new Date();
//       const expiryDate = new Date(
//         today.setDate(today.getDate() + coupon.expiresIn)
//       );

//       // Create a new coupon document or update coupon with customer reference
//       const newCoupon = new Coupon({
//         ...coupon.toObject(), // Copy coupon details
//         _id: undefined, // Ensure the _id is not copied, so MongoDB generates a new one
//         customer: customer._id, // Associate coupon with customer
//         expiryDate: expiryDate, // Set expiry date for the coupon
//       });

//       // Save the new coupon (this will be a separate instance for the customer)
//       await newCoupon.save();

//       // Push the coupon reference to the customer's coupon list
//       customer.coupons.push(newCoupon._id);
//     }

//     // Save the updated customer document with the assigned coupons
//     await customer.save();

//     // Send coupons to the customer's WhatsApp
//     await sendCouponsOnMobile(customer.phoneNumber, assignedCoupons);

//     res.status(200).json({
//       message: "Coupons assigned and sent to customer",
//       coupons: assignedCoupons,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

export const assignCouponsToCustomerold = asyncHandler(async (req, res) => {
  const { phoneNumber, name } = req.body;

  try {
    // Check if name is provided for new customers
    // if (!name && !(await Customer.findOne({ phoneNumber }))) {
    //   return res
    //     .status(400)
    //     .json({ message: "Name is required for new customers." });
    // }

    let customer = await Customer.findOne({ phoneNumber });

    // If customer doesn't exist, create a new customer
    if (!customer) {
      customer = new Customer({
        phoneNumber,
        name, // If name is provided, use it
        coupons: [], // Initialize with an empty coupon array
      });
      await customer.save();
      console.log("New customer created:", customer);
    }

    // Fetch available coupons
    const availableCoupons = await Coupon.find({ customer: null });

    if (availableCoupons.length === 0) {
      return res
        .status(400)
        .json({ message: "No available coupons. Please add coupons first." });
    }

    // Assign first 3 available coupons to customer
    const assignedCoupons = availableCoupons.slice(0, 3);

    const newlyAssignedCoupons = [];

    // Iterate through each coupon and assign to the customer
    for (let coupon of assignedCoupons) {
      const today = new Date();
      // Calculate expiry date based on coupon's expiresIn value
      const expiryDate = new Date(
        today.setDate(today.getDate() + coupon.expiresIn)
      );

      // Format the expiry date to only keep the YYYY-MM-DD part
      const formattedExpiryDate = expiryDate.toISOString().split("T")[0]; // "2025-04-03"

      // Create a new coupon document or update coupon with customer reference
      const newCoupon = new Coupon({
        ...coupon.toObject(), // Copy coupon details
        _id: undefined, // Ensure the _id is not copied, so MongoDB generates a new one
        customer: customer._id, // Associate coupon with customer
        expiryDate: formattedExpiryDate, // Use formatted expiry date
      });

      // Save the new coupon (this will be a separate instance for the customer)
      await newCoupon.save();

      // console.log("new Coupns in loop", newCoupon);

      // Push the coupon reference to the customer's coupon list
      customer.coupons.push(newCoupon._id);

      newlyAssignedCoupons.push(newCoupon);
    }

    // Save the updated customer document with the assigned coupons
    await customer.save();

    // Send coupons to the customer's WhatsApp
    console.log("assign couponss ", newlyAssignedCoupons);
    await sendCouponsOnWhatsApp(customer.phoneNumber, newlyAssignedCoupons);

    // await sendCouponsOnMobile(customer.phoneNumber, newlyAssignedCoupons);
    res.status(200).json({
      message: "Coupons assigned and sent to customer",
      coupons: assignedCoupons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// export const assignCouponsToCustomer2 = asyncHandler(async (req, res) => {
//   const { phoneNumber, name, expiresInDays } = req.body; // Expect expiresInDays in request

//   try {
//     // Validate that expiresInDays is a valid value
//     if (![10, 20, 30].includes(expiresInDays)) {
//       return res.status(400).json({
//         message:
//           "Invalid expiresInDays. Please choose from 10, 20, or 30 days.",
//       });
//     }

//     // Check if name is provided for new customers
//     if (!name && !(await Customer.findOne({ phoneNumber }))) {
//       return res
//         .status(400)
//         .json({ message: "Name is required for new customers." });
//     }

//     let customer = await Customer.findOne({ phoneNumber });

//     // If customer doesn't exist, create a new customer
//     if (!customer) {
//       customer = new Customer({
//         phoneNumber,
//         name, // If name is provided, use it
//         coupons: [], // Initialize with an empty coupon array
//       });
//       await customer.save();
//       // console.log("New customer created:", customer);
//     }

//     // Fetch available coupons
//     const availableCoupons = await Coupon.find({ customer: null });

//     if (availableCoupons.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No available coupons. Please add coupons first." });
//     }

//     // Assign the first 3 available coupons to customer
//     const assignedCoupons = availableCoupons.slice(0, 3);

//     // Calculate the expiryDate for each coupon based on expiresInDays
//     assignedCoupons.forEach((coupon) => {
//       // Calculate the expiry date from today based on expiresInDays
//       const today = new Date();
//       const expiryDate = new Date(
//         today.setDate(today.getDate() + expiresInDays)
//       ); // Add days to today

//       coupon.expiryDate = expiryDate; // Set the expiry date for the coupon
//       coupon.expiresInDays = expiresInDays; // Store the expiresInDays for reference
//       coupon.customer = customer._id; // Associate coupon with the customer
//       customer.coupons.push(coupon._id); // Add coupon to customer's list of coupons
//     });

//     // Save the updated coupons and customer
//     await Promise.all(assignedCoupons.map((coupon) => coupon.save()));
//     await customer.save();

//     // Send coupons to the customer's WhatsApp (or SMS, etc.)
//     // await sendCouponToWhatsApp(customer.phoneNumber, assignedCoupons);
//     await sendCouponsOnMobile(customer.phoneNumber, assignedCoupons);

//     res.status(200).json({
//       message: "Coupons assigned and sent to customer",
//       coupons: assignedCoupons,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// best senarois

// export const assignCouponsToCustomer3 = asyncHandler(async (req, res) => {
//   const { phoneNumber, name } = req.body;

//   try {
//     // Check if name is provided for new customers
//     if (!name && !(await Customer.findOne({ phoneNumber }))) {
//       return res
//         .status(400)
//         .json({ message: "Name is required for new customers." });
//     }

//     let customer = await Customer.findOne({ phoneNumber });

//     // If customer doesn't exist, create a new customer
//     if (!customer) {
//       customer = new Customer({
//         phoneNumber,
//         name, // If name is provided, use it
//         coupons: [], // Initialize with an empty coupon array
//       });
//       await customer.save();
//       console.log("New customer created:", customer);
//     }

//     // Fetch available coupons (those that are unassigned)
//     const availableCoupons = await Coupon.find({ customer: null });

//     if (availableCoupons.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No available coupons. Please add coupons first." });
//     }

//     // Check if the customer already has valid, unexpired, and unredeemed coupons
//     const existingCoupons = await Coupon.find({
//       customer: customer._id,
//       expiryDate: { $gte: new Date() }, // Check for unexpired coupons
//       redeemed: false, // Assuming there's a `redeemed` field that marks if a coupon is redeemed
//     });

//     // If the customer has valid, unexpired coupons, do not assign new ones
//     if (existingCoupons.length > 0) {
//       return res
//         .status(400)
//         .json({ message: "Customer already has valid unexpired coupons." });
//     }

//     // Assign first 3 available coupons to customer
//     const assignedCoupons = availableCoupons.slice(0, 3);
//     const newlyAssignedCoupons = [];

//     // Iterate through each coupon and assign to the customer
//     for (let coupon of assignedCoupons) {
//       const today = new Date();
//       const expiryDate = new Date(
//         today.setDate(today.getDate() + coupon.expiresIn)
//       );
//       const formattedExpiryDate = expiryDate.toISOString().split("T")[0];

//       const newCoupon = new Coupon({
//         ...coupon.toObject(),
//         _id: undefined, // Ensure MongoDB generates a new ID
//         customer: customer._id, // Associate with customer
//         expiryDate: formattedExpiryDate, // New expiry date
//       });

//       await newCoupon.save();
//       console.log("New coupon created:", newCoupon);

//       // Push the new coupon's ID to the customer's coupons array
//       customer.coupons.push(newCoupon._id);

//       // Add to the newly assigned coupons array
//       newlyAssignedCoupons.push(newCoupon);
//     }

//     // Save the updated customer document with the newly assigned coupons
//     await customer.save();

//     // Send coupons to the customer's mobile
//     console.log("Sending newly assigned coupons:", newlyAssignedCoupons);
//     await sendCouponsOnMobile(customer.phoneNumber, newlyAssignedCoupons);

//     res.status(200).json({
//       message: "Coupons assigned and sent to customer",
//       coupons: newlyAssignedCoupons,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

export const getAllCustomers = asyncHandler(async (req, res) => {
  try {
    // Fetch all customers from the database
    const customers = await Customer.find();

    // Send response with the customers data
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching customers" });
  }
});

export const updateCustomer = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  console.log("Backedn Controller hit updateCustomer");
  const { name, phone, id } = req.body;
  try {
    // Find the customer by ID and update their details
    const customer = await Customer.findById(id);
    // const customer = await Customer.findByIdAndUpdate(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update customer data with new values (only update fields that are provided)
    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;

    // Save the updated customer
    const updatedCustomer = await customer.save();

    // Return the updated customer data in the response
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// export const updateCustomer = asyncHandler(async (req, res) => {
//   // Extract the customer ID from the URL and the updated data from the request body
//   const { id } = req.params;
//   const { name, email, phone, address } = req.body;

//   try {
//     // Find the customer by ID and update their details
//     const customer = await Customer.findById(id);

//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     // Update customer data with new values (only update fields that are provided)
//     customer.name = name || customer.name;
//     customer.email = email || customer.email;
//     customer.phone = phone || customer.phone;
//     customer.address = address || customer.address;

//     // Save the updated customer
//     const updatedCustomer = await customer.save();

//     // Return the updated customer data in the response
//     res.status(200).json(updatedCustomer);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error while updating customer' });
//   }
// });

export const assignCouponsToCustomer = asyncHandler(async (req, res) => {
  const { phoneNumber, name } = req.body;

  try {
    // 1. Get or create customer
    let customer = await Customer.findOne({ phoneNumber });

    if (!customer) {
      customer = await Customer.create({
        phoneNumber,
        name,
        coupons: [],
      });
      console.log("New customer created:", customer);
    }

    // 2. Get unassigned coupons
    const availableCoupons = await Coupon.find({ customer: null }).limit(3);

    if (availableCoupons.length === 0) {
      return res.status(400).json({
        message: "No available coupons. Please add coupons first.",
      });
    }

    // 3. Assign and customize coupons
    const today = new Date();
    const customerCouponIds = [];
    const newlyAssignedCoupons = [];

    for (const coupon of availableCoupons) {
      const expiryDate = new Date(today);
      expiryDate.setDate(today.getDate() + coupon.expiresIn);

      const newCoupon = await Coupon.create({
        ...coupon.toObject(),
        _id: undefined, // Let MongoDB generate new ID
        customer: customer._id,
        expiryDate: expiryDate.toISOString().split("T")[0],
      });

      customerCouponIds.push(newCoupon._id);
      newlyAssignedCoupons.push(newCoupon);
    }

    // 4. Update customer document
    customer.coupons.push(...customerCouponIds);
    await customer.save();

    // 5. Notify customer
    await sendCouponsOnWhatsApp(customer.phoneNumber, newlyAssignedCoupons);

    // 6. Respond
    res.status(200).json({
      message: "Coupons assigned and sent to customer",
      coupons: newlyAssignedCoupons,
    });
  } catch (error) {
    console.error("Error assigning coupons:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const getCustomersWithNoCouponsold = asyncHandler(async (req, res) => {
  try {
    const today = new Date();

    // Step 1: Find customer IDs that DO have at least one valid coupon
    const customersWithValidCoupons = await Coupon.distinct("customer", {
      isRedeemed: false,
      isConsidered: true,
      expiryDate: { $gte: today },
      customer: { $ne: null }, // exclude unassigned coupons
    });

    // Step 2: Find customers NOT in that list
    const customers = await Customer.find({
      _id: { $nin: customersWithValidCoupons },
    }).select("name phoneNumber"); // Optional: customize fields

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers with no valid coupons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const getCustomersWithNoCoupons = asyncHandler(async (req, res) => {
  try {
    const today = new Date();

    // Step 1: Customers who HAVE valid coupons
    const customersWithValidCoupons = await Coupon.distinct("customer", {
      isRedeemed: false,
      isConsidered: true,
      expiryDate: { $gte: today },
      customer: { $ne: null },
    });

    // Step 2: Find customers WITHOUT valid coupons
    const customers = await Customer.find({
      _id: { $nin: customersWithValidCoupons },
    }).select("name phoneNumber");

    // Step 3: For each customer, find the latest coupon expiryDate (or null)
    const customersWithLastExpiry = await Promise.all(
      customers.map(async (customer) => {
        const lastCoupon = await Coupon.findOne({ customer: customer._id })
          .sort({ expiryDate: -1 })
          .select("expiryDate")
          .lean();

        const lastCouponExpiryDate = lastCoupon
          ? lastCoupon.expiryDate.toISOString().split("T")[0] // Format as YYYY-MM-DD
          : null;

        return {
          name: customer.name,
          phoneNumber: customer.phoneNumber,
          lastCouponExpiryDate,
          // lastCouponExpiryDate: lastCoupon ? lastCoupon.expiryDate : null,
        };
      })
    );

    // if (customersWithLastExpiry.length < 1) {
    //   return res.status(404).json({ message: "No customers found" });
    // }

    res.status(200).json(customersWithLastExpiry);
  } catch (error) {
    console.error("Error fetching customers with expired/no coupons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
