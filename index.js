const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ujjj8jx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// middleware
app.use(cors());
app.use(express());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });

    const reviewCollection = client.db("mehanDB").collection("reviews");

    // reviews route
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

// home route
app.get("/", (req, res) => {
  res.send("server is runnning...");
});

app.listen(port, () => {
  console.log(`server is running successfully at http://localhost:${port}`);
});
