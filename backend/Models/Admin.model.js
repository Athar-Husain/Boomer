import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminModelSchema = mongoose.Schema({
  userId: {
    type: String,
    unique: [true, "This User Id is already in Use"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "This Email is already in Use"],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  //
  mobile: {
    type: String,
    required: [true, "Please add a Mobile"],
    trim: true,
  },

  password: {
    type: String,
    trim: true,
    required: [true, "Please add a Password"],
  },
  userType: {
    type: String,
    default: "admin",
  },
});

// Hash password before saving
adminModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model("admin", adminModelSchema);

export default Admin;
