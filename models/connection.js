const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://leonalexandreschouller:MTdhhAHEZjim7cRC@cluster0.lfd4f0n.mongodb.net/PreventFit";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
