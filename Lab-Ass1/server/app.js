const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true); // Suppress deprecation warning

require("dotenv").config();

const app = express();

// app config
app.use(cors());
app.use(express.json());

// Define the root route directly on the app
app.get('/', (_req, res) => {
  res.send({ message: 'Connected' });
});

// Routers
const calorie = require("./routes/calorie.routes.js");
const users = require("./routes/users.routes.js");

// Use routers
app.use("/calorie", calorie);
app.use("/users", users);

// port and DB config
const DATABASE_CONNECTION = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

// mongoose connection
mongoose
  .connect(DATABASE_CONNECTION)
  .then(() => {
    console.log('Database connected successfully');
    // Start the server only after the database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running at : http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));
