const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//POST REGISTER
const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      dateOfBirth,
      parentEmail,
      parentContact,
    } = req.body;

    if (!firstName) {
      return res.send({ message: "First Name is Required" });
    }
    if (!lastName) {
      return res.send({ message: "Last Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!dateOfBirth) {
      return res.send({ message: "Date of Birth is Required" });
    }
    // if (!parentEmail) {
    //   return res.send({ message: "Parent Email is Required" });
    // }
    // if (!parentContact) {
    //   return res.send({ message: "Parent Contact Number is Required" });
    // }

    //Check user
    const existingUser = await userModel.findOne({ email });

    //User exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "This user is already registered. Please login",
      });
    }
    //Register user
    const hashedPassword = await hashPassword(password);
    //Save
    const user = await new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      dateOfBirth,
      parentEmail,
      parentContact,
    }).save();
    res.status(201).send({
      success: true,
      message: "User successfully registered!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration Error!",
      error,
    });
  }
};

//POST LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password!",
      });
    }
    //Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password!",
      });
    }
    // Remember me
    // if (rememberMe) {
    //   console.log("Remember User!");
    //   res.status(200).send({
    //     success: true,
    //     message: "Remember User!",
    //   });
    // }
    //Token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        parentEmail: user.parentEmail,
        parentContact: user.parentContact,
        role: user.role,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Error!",
      error,
    });
  }
};

//Test controller
const testController = (req, res) => {
  res.send("protected route");
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: 0 })
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).send({ success: true, message: "All Users List", users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting users",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  getAllUsersController,
};
