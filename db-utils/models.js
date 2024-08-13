import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  userType: { type: String, enum: ['customer', 'admin'], required: true },
  gstNo: { type: String, required: false },
  password: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);


