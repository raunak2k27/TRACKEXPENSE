import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, trim: true },
        countryCode: { type: String, default: "+91" },
        phone: { type: String, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        location: { type: String, trim: true },
        issueType: { type: String, default: "Other" },
        message: { type: String, required: true, trim: true },
        status: { type: String, enum: ["new", "in-progress", "resolved"], default: "new" },
    },
    { timestamps: true }
);

export default mongoose.model("Support", supportSchema);