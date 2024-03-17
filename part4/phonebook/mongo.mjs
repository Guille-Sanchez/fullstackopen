import mongoose from "mongoose";
import { info } from "./utils/logger.mjs";
if (process.argv.length < 3) {
  info("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://gsanz1997:${password}@fullstackopen.fz7pyif.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (process.argv.length === 3) {
  Phonebook.find({}).then((result) => {
    info("phonebook:");
    result.forEach((person) => {
      info(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const phonebook = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });

  phonebook.save().then((result) => {
    info("contact saved!");
    mongoose.connection.close();
  });
}
