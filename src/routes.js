const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// MongoDB URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

connectToDB();

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const database = client.db('nextgen');
        const users = database.collection('userinfo');

        const user = await users.findOne({ username: username });

        if (user && user.password === password) {
            return res.status(200).json({ msg: 'Login successful' });
        } else {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Error during login", error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
