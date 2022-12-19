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
        res.json(appointmentFromDb);
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
        // console.log(appointmentFromDb);
        res.json(appointmentFromDb);
}).catch(err => {console.log({err})});
})
//END NEW

router.post('/edit/:id', (req, res, next) => {
    Appointments.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
        appointmentType: req.body.appointmentType,
        date: req.body.date,
        time: req.body.time,

    }, {new:true})
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.json({err});
    });
});

// Delete
router.post('/delete', (req,res,next) => {
    Appointments.findByIdAndRemove(req.body.id)
    .then(() => {
        res.json(req.params.id)
    })
    .catch((err) => {
        res.json({err, success: false})
    })
})
module.exports = router;