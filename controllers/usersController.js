const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;

/**
 * User Read - All
 */
router.get('/', isAuthenticated, function(req, res) {
    db.User.findAll(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User Read - One
 */
router.get('/:id', isAuthenticated, function(req, res) {
    db.User.findByPk(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Create
 */
router.post('/', isAuthenticated, function(req, res) {
    db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Update
 */
router.put('/:id', isAuthenticated, function(req, res) {
    db.User.update(req.body, { where: { id: req.params.id }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Delete
 */
router.delete('/:id', isAuthenticated, function(req, res) {
    db.User.destroy({ where: { id: req.params.id }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
