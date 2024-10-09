const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017';

// Function to create a new database and insert data
async function createDatabase() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('nextgen1');
        const collection = db.collection('sampleCollection');

        // Insert a sample document
        const result = await collection.insertOne({ name: 'Sample Data' });
        console.log('Database and collection created with document:', result);
    } finally {
        await client.close();
    }
}

createDatabase().catch(console.error);
