const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// ...............................
// Get Action
// ...............................

router.get('/action/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(actions => {
            if(actions) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ error: "the action id does not exist"});
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Could not be retrieved."});
        });
});

// ...............................
// Create Action
// ...............................

router.post('/actions')


// ...............................
// Update Action
// ...............................




// ...............................
// Delete Action
// ...............................




// ...............................

module.exports = router;