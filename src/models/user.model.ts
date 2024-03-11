// pkgs:
import mongoose from "mongoose";
import userRoles from "../common/constants/user-roles.const";
const { Schema } = mongoose;

// create user schema:
const CustomerSchema = new Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    nationalId: { type: String, require: true },
    role: {
        type: String,
        default: userRoles.CUSTOMER,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    id: { type: String },
});

// create customer model:
const User = mongoose.model("User", CustomerSchema);
export default User;
