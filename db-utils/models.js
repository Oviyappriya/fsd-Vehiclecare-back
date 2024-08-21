import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  userType: { type: String, enum: ['customer', 'seller'], required: true },
  gstNo: { type: String, required: false },
  password: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);


const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String], // Array of strings to store image URLs or paths
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.every((url) => typeof url === "string");
      },
      message: "Images must be an array of strings",
    },
  },
  sellerInfo: {
    type: new Schema({
      name: {
        type: String,
        required: true,
        trim: true,
      },
      userId: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    }),
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

export const Service = mongoose.model('Service', serviceSchema,"services");

const BookingSchema = new Schema({
  bookingId: {
    type: String,
   
  },
  services: {
    type: Array,
  },
  totalQty: {
    type: Number,
    
  },
  bookingTotal: {
    type: Number,
    
  },
  userId: {
    type: String,
    
  },
});

export const Booking = mongoose.model("Booking", BookingSchema);
