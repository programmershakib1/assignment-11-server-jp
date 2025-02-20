require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://tasks-management-org.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@programmershakib.sm4uc.mongodb.net/?retryWrites=true&w=majority&appName=programmershakib`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 }); 
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    const usersCollection = client.db("tasksDB").collection("users");
    const tasksCollection = client.db("tasksDB").collection("tasks");

    // jwt
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "10d",
      });
      res.send({ token });
    });

    // verify token
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unAuthorized access" });
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unAuthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // get all tasks
    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;

      const result = await tasksCollection
        .find({ user_email: email })
        .sort({ order: 1 })
        .toArray();
      res.send(result);
    });

    // get task
    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await tasksCollection.findOne(query);

      res.send(result);
    });

    // add task
    app.post("/task", async (req, res) => {
      const taskInfo = req.body;

      const result = await tasksCollection.insertOne(taskInfo);
      res.send(result);
    });

    // edit task
    app.put("/task/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          order: req.body.order,
          timestamp: req.body.timestamp,
          user_name: req.body.user_name,
          user_email: req.body.user_email,
          user_image: req.body.user_image,
        },
      };

      const result = await tasksCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.patch("/task/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          category: req.body.category,
        },
      };

      const result = await tasksCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // delete task
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await tasksCollection.deleteOne(query);
      res.send(result);
    });

    // order save
    app.post("/update-task-order", async (req, res) => {
      const { tasks } = req.body;

      const updates = tasks.map((task, index) => ({
        updateOne: {
          filter: { _id: new ObjectId(task._id) },
          update: { $set: { order: index } },
        },
      }));

      try {
        const result = await tasksCollection.bulkWrite(updates);
        if (result.modifiedCount > 0) {
          res.send({ success: true, message: "Order updated successfully!" });
        } else {
          res
            .status(400)
            .send({ success: false, message: "Failed to update order!" });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
    });
    // user
    // add and update user
    app.put("/user", async (req, res) => {
      const { email, lastSignIn } = req.body;
      const userInfo = req.body;

      const user = await usersCollection.findOne({ email });

      if (user) {
        const updatedUser = {
          $set: {
            lastSignIn: lastSignIn,
          },
        };
        const result = await usersCollection.updateOne({ email }, updatedUser);
        res.send(result);
      } else {
        const result = await usersCollection.insertOne(userInfo);
        res.send(result);
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("assignment 11 JP is running");
});

app.listen(port, () => {
  console.log(`assignment 11 JP is running on port ${port}`);
});
