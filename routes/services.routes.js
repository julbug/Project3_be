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

//Attempt 1 NEW
router.get('/services/:id', (req, res, next) => {
    console.log(req.params.id)
   Service.findById(req.params.id)
    .then((serviceFromDb) => {
      console.log(serviceFromDb)
    res.json({service: serviceFromDb})
    }).catch((err)=> {
        res.json(err)
    })
  
    })
    //END NEW

//Attempt 2 NEW
router.get('/services', (req, res, next) => {
    Service.find()
    .then((serviceFromDb) => {
        console.log({serviceFromDb})
        data = {
            services: serviceFromDb
        }
        res.json(data);
    })
    .catch((err) => {
        res.json(err)
    });
})
//END NEW

// Create
router.post('/create', (req, res, next) => {
    
    const serviceToCreate = {
		// image: req.body.image,
		serviceType: req.body.serviceType,
		additionalInfo: req.body.additionalInfo,
		time: req.body.time,
        price: req.body.price,
	};

    Service.create({serviceToCreate})
    .then((createdService) => {
        res.json(createdService);
    }).catch((err) => {
        res.json(err);
});
});


// Update
//NEW
router.get('/services/:id/edit', (req, res, next) => {
    Services.findById(req.params.id)
    .then(serviceFromDb => {
        console.log(serviceFromDb);
        res.json(serviceFromDb);
}).catch(err => {console.log({err})});
})
//END NEW

router.post('/services/:id', (req, res, next) => {
    Service.findByIdAndUpdate(req.body.id, {
        // image: req.body.image,
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
router.delete('/:id/delete', (req, res) => {
    Service.findByIdAndDelete(req.body.service_id).then(() => {
        res.json({success: true, res: `Service ${req.body.service_id} has been deleted!`});
    }).catch(err => {
        res.json({success: false, res: err});
    })
});
module.exports = router;