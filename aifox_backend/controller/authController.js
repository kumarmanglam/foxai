
const JWT = require("jsonwebtoken")
const Person = require("../models/userModel.js")
const { comparePassword, hashPassword } = require("../helpers/authHelper.js")


//login

const loginController = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    if (!email_id || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await Person.findOne({ email_id });
    console.log(user);


    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    // Check validation for password
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Create JWT token
    const token = await JWT.sign(
      { email: user.email_id },
      "foxai",

      { expiresIn: "7d" }
    );


    // Respond with token and user details
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};



//add user

const addUserController = async (req, res) => {

  try {
    const { name, email_id, password, department, role, phone_number } = req.body;
    const hashedPassword = await hashPassword(password);

    const newPerson = new Person({
      name,
      password: hashedPassword,
      email_id,
      department,

      role,
      phone_number

    });
    console.log(newPerson)
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: "internal server" });
  }
}

//update user

const updateUserController = async (req, res) => {
  try {
    const email_id = req.params.email_id;
    console.log(email_id)
    const updates = req.body;
    const updatedUser = await Person.findOneAndUpdate(

      { email_id: email_id },
      updates
    );


    console.log(updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

//delete
const deleteUserController = async (req, res) => {
  try {
    const email_id = req.params.email_id;
    console.log({ email: email_id })

    const deletedUser = await Person.findOneAndDelete({ email_id: email_id });


    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}



//get all user

const getAllUserController = async (req, res) => {
  try {
    const users = await Person.find();

    console.log({ users })
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}


//get user info

const getUserController = async (req, res) => {
  try {
    const email_id = req.params.email_id;
    console.log({ email_id })
    const user = await Person.findOne({ email_id });
    console.log({ user })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addUserController,
  loginController,
  updateUserController,
  deleteUserController,
  getAllUserController,
  getUserController
};

