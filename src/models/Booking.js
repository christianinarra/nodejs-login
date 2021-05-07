const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    bookingId: { type: String, trim: true },
    firstName: { type: String, required: true, trim: true },    
    lastName: { type: String, required: true, trim: true },        
    streetAddress: { type: String, required: true, trim: true },        
    bookingPrice: { type: Number, required: true },        
    bookingTime: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("booking", BookingSchema);