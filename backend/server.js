const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// JWT SECRET

const JWT_SECRET =
  process.env.JWT_SECRET || "nexatech-secret-key";

// MongoDB Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/nexatech")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// Contact Schema

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// ADMIN LOGIN

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      {
        username: username,
        role: "admin",
      },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Username or Password",
  });
});

// AUTH MIDDLEWARE

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized. Please login first.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

// HOME

app.get("/", (req, res) => {
  res.send("Home Page");
});

// ABOUT

app.get("/about", (req, res) => {
  res.send("About Page");
});

// SERVICES

app.get("/services", (req, res) => {
  res.send("Services Page");
});

// SAVE CONTACT

app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await newContact.save();

    console.log("New Contact Saved:");
    console.log(newContact);

    res.send("Contact Saved Successfully");
  } catch (error) {
    console.log(error);

    res.status(500).send("Error Saving Contact");
  }
});

// SHOW ALL CONTACTS
// PROTECTED

app.get("/contacts", verifyAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    console.log(error);

    res.status(500).send("Error Fetching Contacts");
  }
});

// DELETE CONTACT
// PROTECTED
app.delete("/contact/:id", verifyAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.send("Contact Deleted Successfully");
  } catch (error) {
    console.log(error);

    res.status(500).send("Delete Failed");
  }
});
// UPDATE CONTACT
// PROTECTED

app.put("/contact/:id", verifyAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      },
      { new: true }
    );

    res.send("Contact Updated Successfully");
  } catch (error) {
    console.log(error);

    res.status(500).send("Update Failed");
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});