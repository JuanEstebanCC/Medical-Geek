const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
let random = require("mongoose-simple-random");
const bcrypt = require("bcryptjs");
mongoose.plugin(random);
const userSchema = new Schema({
  full_name: {
    type: String,
    required: true,
    maxLength: 80,
    minLength: 3,
  },

  cell_phone: {
    type: Number,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    pattern: "^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$",
  },

  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  photo: {
    type: String,
    default:
      "https://s.clipartkey.com/mpngs/s/146-1461473_default-profile-picture-transparent.png",
  },
  usertype: {
    type: Number,
    enum: [1, 2, 3], // 1 = Admin, 2 = Normal User, 3 = Doctor
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    default: null,
  },
  dietType: {
    enum: ["Vegetarian", "Carnivore", "Macrobiotic", "Fertility"],
  },
  medicines: [
    {
      nameMedicine: {
        type: String,
        default: null,
      },
      how_many: {
        type: Number,
        default: null,
      },
      diagnostic: {
        type: String,
        default: null,
      },
      how_often: {
        type: Array,
        default: null,
      },
    },
  ],
  assignedDoctor: {
    type: String,
    default: null,
  },
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
