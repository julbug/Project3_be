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


// // OTHER
// const mongoose = require('mongoose');


// const Schema = mongoose.Schema,
//   model = mongoose.model.bind(mongoose),
//   ObjectId = mongoose.Schema.Types.ObjectId;


//   const slotSchema = new Schema ({
//     slot_time: String,
//     slot_date: String,
//     created_at: Date
//   });

// const Slot = model('Slot', slotSchema);

// const appointmentSchema = new Schema({
//   id: ObjectId,
//   firstName: String,
//   lastName: String,
//   email: String,
//   phone: Number,
//   appointmentType: String,
//   date: Date,
//   time: String,
//   slots:{type: [
//     {
//       type: Schema.Types.ObjectId, 
//       ref: 'Slot',
//     }
//     ]
//   }
// },{
//     timestamps: true
// });

// const Appointment = model('Appointment', appointmentSchema);

// module.exports = {
//   Appointment, Slot
// };