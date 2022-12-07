const express = require('express');
const router = require("express").Router();
const Appointments = require('../models/Appointments.model');

// Read
router.get('/', (req, res, next) => {
    Appointments.find()
    .then((appointments) => {
        res.json(appointments);
    }).catch(err => {
        res.json(err);
    })
});

// Read
router.get('/:id', (req, res, next) => {
    Appointments.findById(req.params.id)
    .then((appointmentFromDb) => {
        res.json({appointment: appointmentFromDb});
    }).catch(err => {
        res.json(err);
    });
});

// Create
router.post('/create', (req, res, next) => {
    
    const appointmentToCreate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
        appointmentType: req.body.appointmentType,
        date: req.body.date,
        time: req.body.time,
        appointmentDetails: req.body.appointmentDetails,
	};

    Appointments.create(appointmentToCreate)
    .then((createdAppointment) => {
        res.json(createdAppointment);
    }).catch((err) => {
        res.json(err);
});
});

// Update
//NEW
router.get('/appointments/:id/edit', (req, res, next) => {
    Appointments.findById(req.params.id)
    .then(appointmentFromDb => {
        console.log(appointmentFromDb);
        res.json(appointmentFromDb);
}).catch(err => {console.log({err})});
})
//END NEW

router.post('/:id', (req, res, next) => {
    Appointments.findByIdAndUpdate(req.body.appointment_id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
        appointmentType: req.body.appointmentType,
        date: req.body.date,
        time: req.body.time,
        appointmentDetails: req.body.appointmentDetails,
    }, {new:true})
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.json({err});
    });
});

// Delete
router.delete('/:id/delete', (req, res, next) => {
    Appointments.findByIdAndDelete(req.body.appointment_id)
    .then(() => {
        res.json({success: true, res: `Appointment ${req.body.appointment_id} has been deleted!`});
    }).catch(err => {
        res.json({success: false, res: err});
    })
});
module.exports = router;