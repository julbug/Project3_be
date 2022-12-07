// const express = require('express');
// const router = require("express").Router();
// const Location = require('../models/Location.model');

// // Read
// router.get('/', (req, res, next) => {
//     Location.find()
//     .then((locations) => {
//         res.json(locations);
//     }).catch(err => {
//         res.json(err);
//     })
// });

// // Read
// router.get('/:location_id', (req, res, next) => {
//     Location.findById(req.params.location_id)
//     .then((locationFromDb) => {
//         res.json(locationFromDb);
//     }).catch(err => {
//         res.json(err);
//     })
// });

// // Create
// router.post('/create', (req, res, next) => {
 
//     const locationToCreate = {
// 		address: req.body.address,
// 		apartmentNumber: req.body.apartmentNumber,
// 		zip: req.body.zip,
// 		city: req.body.city,
//         state: req.body.state,
// 	};

//     Location.create(locationToCreate)
//     .then((createdLocation) => {
//         res.json(createdLocation);
//     }).catch(err => {
//         res.json(err);
//     })
// });

// // Update
// router.post('/:id', (req, res, next) => {
//     Location.findByIdAndUpdate(req.body.location_id, {
//         address: req.body.address,
// 		apartmentNumber: req.body.apartmentNumber,
// 		zip: req.body.zip,
// 		city: req.body.city,
//         state: req.body.state,
//     }, {new: true})
//     .then((response) => {
//         res.json(response);
//     })
//     .catch((err) => {
//         res.json({err});
//     });
// });

// // Delete
// router.delete('/:id/delete', (req, res) => {
//     Location.findByIdAndDelete(req.body.location_id).then(() => {
//         res.json({success: true, res: `Location ${req.body.location_id} has been deleted!`});
//     }).catch(err => {
//         res.json({success: false, res: err});
//     })
// });
// module.exports = router;