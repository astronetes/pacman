'use strict';

var MongoClient = require('mongodb').MongoClient;
var ServerApiVersion = require('mongodb').ServerApiVersion;
var config = require('./config');
var _db;




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pacman:<password>@pacmandemo.trgw4.mongodb.net/?retryWrites=true&w=majority&appName=PacmanDemo";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



function Database() {
    this.connect = async function() {
        const client = new MongoClient(config.database.url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db(process.env.MONGO_DATABASE).command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return client;
    }

    this.getDb = async function(app, callback) {
        let client
        try {
            client = await this.connect();
            const db = client.db(process.env.MONGO_DATABASE);

            // db.collection("").insertOne()
            // 
            app.locals.db = db;
            _db = db;
            callback(null, _db);
        } catch (err) {
            callback(err, _db);
        }
    }
}

module.exports = exports = new Database(); // Singleton
