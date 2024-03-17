import mongoose from "mongoose"
import { info, error } from "../utils/logger.mjs"
import { MONGO_URL } from "../utils/config.mjs"

mongoose
  .connect(MONGO_URL)
  .then((_result) => {
    info("connected to MongoDB")
  })
  .catch((er) => {
    error("error connecting to MongoDB:", er.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{6,}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
})

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model("Phonebook", phonebookSchema)
