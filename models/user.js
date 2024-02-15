import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      default: "User",
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 22,
      bcrypt: true,
    },
    activePlan: {
      type: String,
      default: "",
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, retDoc) {
        delete retDoc.password; //removes password from the json doc
        return retDoc;
      },
    },
  }
);

userSchema.index({ email: 1 });
userSchema.index({ activePlan: 1 });

userSchema.plugin(bcrypt);

export default mongoose.model("User", userSchema);
