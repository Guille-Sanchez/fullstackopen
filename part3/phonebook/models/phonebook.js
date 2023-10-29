import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const url = process.env.MONGO_URL
mongoose.connect(url)
.then(_result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number:  {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{6,}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Phonebook', phonebookSchema);
