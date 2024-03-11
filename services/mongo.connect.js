const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://reobre432:Dieu1306@dbfriptest.aghrcy8.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log(`Process failed... ${err}`);
    process.exit(1);
  }
}

async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
