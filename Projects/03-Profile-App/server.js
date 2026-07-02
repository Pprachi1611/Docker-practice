// server.js
// User Management System - Backend
// Node.js + Express + Official MongoDB Node.js Driver (no Mongoose)

const express = require("express");
const path = require("path");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;


// ---------------------------------------------------------------------------
// MongoDB Configuration
// ---------------------------------------------------------------------------
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/?authSource=admin";
const DB_NAME = "user-account";
const COLLECTION_NAME = "users";

let client;

/**
 * connectDB
 * Creates (or reuses) a MongoClient connection and returns the users collection.
 * Reused throughout the project so we don't open a new socket per request.
 */
async function connectDB() {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");
  }
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION_NAME);
}

/**
 * closeDB
 * Gracefully closes the MongoDB connection (used on process shutdown).
 */
async function closeDB() {
  if (client) {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/**
 * isValidObjectId
 * Checks whether a string is a valid MongoDB ObjectId.
 */
function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

/**
 * isValidEmail
 * Basic email format validation.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * validateUserInput
 * Validates required fields for creating/updating a user.
 * Returns an array of error messages (empty array = valid).
 */
function validateUserInput(body, isUpdate = false) {
  const errors = [];
  const { name, email, phone, age } = body;

  if (!isUpdate || name !== undefined) {
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("Name is required");
    }
  }

  if (!isUpdate || email !== undefined) {
    if (!email || typeof email !== "string" || !email.trim()) {
      errors.push("Email is required");
    } else if (!isValidEmail(email)) {
      errors.push("Email format is invalid");
    }
  }

  if (!isUpdate || phone !== undefined) {
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      errors.push("Phone is required");
    }
  }

  if (age !== undefined && age !== null && age !== "") {
    if (isNaN(Number(age))) {
      errors.push("Age must be numeric");
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /users
 * Returns all users, sorted by creation date (newest first).
 */
app.get("/users", async (req, res) => {
  try {
    const collection = await connectDB();
    const users = await collection.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
});

/**
 * GET /users/:id
 * Returns a single user by ID.
 */
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const collection = await connectDB();
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
    });
  }
});

/**
 * POST /users
 * Creates a new user. Validates required fields and unique email.
 */
app.post("/users", async (req, res) => {
  try {
    const errors = validateUserInput(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    const { name, email, phone, age, interest, city, occupation } = req.body;
    const collection = await connectDB();

    // Check for duplicate email
    const existingUser = await collection.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const now = new Date();
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      age: age ? Number(age) : null,
      interest: interest ? interest.trim() : "",
      city: city ? city.trim() : "",
      occupation: occupation ? occupation.trim() : "",
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { _id: result.insertedId, ...newUser },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating user",
    });
  }
});

/**
 * PUT /users/:id
 * Updates an existing user by ID.
 */
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const errors = validateUserInput(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    const collection = await connectDB();

    const existingUser = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, phone, age, interest, city, occupation } = req.body;

    // If email is being changed, ensure it's still unique
    if (email && email.trim().toLowerCase() !== existingUser.email) {
      const duplicate = await collection.findOne({
        email: email.trim().toLowerCase(),
        _id: { $ne: new ObjectId(id) },
      });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "A user with this email already exists",
        });
      }
    }

    const updateFields = { updatedAt: new Date() };
    if (name !== undefined) updateFields.name = name.trim();
    if (email !== undefined) updateFields.email = email.trim().toLowerCase();
    if (phone !== undefined) updateFields.phone = phone.trim();
    if (age !== undefined) updateFields.age = age === "" ? null : Number(age);
    if (interest !== undefined) updateFields.interest = interest.trim();
    if (city !== undefined) updateFields.city = city.trim();
    if (occupation !== undefined) updateFields.occupation = occupation.trim();

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    const updatedUser = await collection.findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
});

/**
 * DELETE /users/:id
 * Deletes a user by ID.
 */
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const collection = await connectDB();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    });
  }
});

// ---------------------------------------------------------------------------
// Fallback route - serve the frontend for any unmatched non-API route
// ---------------------------------------------------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---------------------------------------------------------------------------
// 404 handler for unmatched API routes
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ---------------------------------------------------------------------------
// Global error handler
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB on startup:", error.message);
  }
});

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down server...");
  await closeDB();
  process.exit(0);
});

module.exports = app;