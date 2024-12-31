const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

// CREATE
app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, age },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ (All Users)
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// READ (Single User)
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, age },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "User deleted", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
