const express = require('express');
const router = express.Router();

// schema de site
const Site = require('../models/sites');


// liste des sites
router.get('/sites', (req, res, next) => {
  Site.find((err, sites) => {
    res.json(sites);
  });
});

// ajouter un site
router.post('/site', (req, res, next) => {
  let newSite = new Site({
    nom: req.body.nom,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    photo: req.body.photo
  });

  newSite.save((err, site) => {
    if (err) {
      res.json({msg: 'erreur ajout de site'});
    } else {
      res.json({msg: 'site bien ajouter'});
    }
  });
});

// supprimer un site
router.delete('/site/:id', (req, res, next) => {
  Site.remove({_id: req.params.id}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// modifier un site
router.put('/site/:id', (req, res, next) => {
  Site.findOneAndUpdate({_id: req.params.id},
    {
      $set: {
        nom: req.body.nom,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        photo: req.body.photo
      }
    }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});




module.exports = router;
