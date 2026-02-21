require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
const port =process.env.PORT || 3000

const uri = `mongodb+srv://${process.env.DBUser}:${process.env.DBPassword}@cluster0.j6dmigp.mongodb.net/?appName=Cluster0`;

app.use(cors())
app.use(express.json())


    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	
    await client.connect();

    const NewsDB= client.db("NewsDB");
const newsCollection = NewsDB.collection("News");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Automated News Aggregation System is running')
})

app.listen(port, () => {
  console.log(`Automated News Aggregation System app listening on port ${port}`)
})