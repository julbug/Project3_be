const express = require('express');
const router = require("express").Router();
const Service = require('../models/Service.model');

// Read
router.get('/', (req, res, next) => {
    Service.find()
    .then((services) => {
        res.json(services);
    }).catch(err => {
        res.json(err);
    })
});

// Read
router.get('/:service_id', (req, res, next) => {
    Service.findById(req.params.service_id)
    .then((serviceFromDb) => {
        res.json(serviceFromDb);
    }).catch(err => {
        res.json(err);
    });
});

// Create
router.post('/create', (req, res, next) => {
    
    const serviceToCreate = {
		// image: req.body.image,
		serviceType: req.body.serviceType,
		additionalInfo: req.body.additionalInfo,
		time: req.body.time,
        price: req.body.price,
	};
   
    Service.create(serviceToCreate)
    .then((createdService) => {
       
        res.json(createdService);
    }).catch((err) => {
      
        res.json(err);
});
});


// Update
//NEW
router.get('/services/:id/edit', (req, res, next) => {
    Service.findById(req.params.id)
    .then(serviceFromDb => {
        console.log(serviceFromDb);
        res.json(serviceFromDb);
}).catch(err => {console.log({err})});
})
//END NEW

router.post('/edit/:id', (req, res, next) => {
    Service.findByIdAndUpdate(req.params.id, {
		serviceType: req.body.serviceType,
		additionalInfo: req.body.additionalInfo,
		time: req.body.time,
        price: req.body.price,
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
    Service.findByIdAndRemove(req.body.id)
    .then(() => {
        res.json(req.params.id)
    })
    .catch((err) => {
        res.json({err, success: false})
    })
})
module.exports = router;