const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const appointmentSchema = new Schema({
  // id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  appointmentType: String,
  date: Date,
  time: String,

}, {
    timestamps: true
})

const Appointment = model('Appointment', appointmentSchema);
module.exports = Appointment;
