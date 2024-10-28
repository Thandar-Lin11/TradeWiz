import mongoose from "mongoose";

const forexDataSchema = new mongoose.Schema({
  pair: { type: String, required: true }, // e.g., "EUR/USD"
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ForexData = mongoose.model("ForexData", forexDataSchema);
export default ForexData;
