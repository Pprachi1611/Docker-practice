var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://admin:password@localhost:27017/?authSource=admin';
const dbName = 'user-account';

// ================= CONNECT HELPER =================
async function connectDB() {
    const client = await MongoClient.connect(url);
    return client;
}

// ================= GET PROFILE =================
app.get('/get-profile', async function (req, res) {

    let client;

    try {
        client = await connectDB();
        const db = client.db(dbName);

        let data = await db.collection('users').findOne({ userid: 1 });

        // default if empty
        if (!data) {
            data = {
                userid: 1,
                name: "Anna Smith",
                email: "anna@gmail.com",
                interest: "Coding"
            };

            await db.collection('users').insertOne(data);
        }

        res.send(data);

    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    } finally {
        if (client) client.close();
    }
});

// ================= SAVE PROFILE =================
app.post('/update-profile', async function (req, res) {

    console.log("Save request received:", req.body);

    let client;

    try {
        client = await connectDB();
        const db = client.db(dbName);

        const userObj = req.body;
        userObj.userid = 1;

        const result = await db.collection('users').updateOne(
            { userid: 1 },
            { $set: userObj },
            { upsert: true }
        );

        console.log("Mongo result:", result.modifiedCount, result.upsertedCount);

        res.send(userObj);

    } catch (err) {
        console.log("DB ERROR:", err);
        res.status(500).send("DB error");
    } finally {
        if (client) client.close();
    }
});

// ================= START =================
app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});