const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// ...............................
// Get Action
// ...............................

router.get('/projects/:id/action/:id', (req, res) => {
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

router.get('/action', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: 'problem getting actions'});
        });
});

// ...............................
// Create Action
// ...............................

router.post('/action/', (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            if(!req.body.project_id || !req.body.description || !req.body.notes) {
                res.status(400).json({ error: "please have valid project id, a description and notes"})
            } else {
                res.status(201).json(action)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "there was an error saving data"});
        });
});


// ...............................
// Update Action
// ...............................

router.put('/action/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const updateProject = await Actions.update(id, req.body)
      res.status(201).json({ data: updateProject})
    } catch {
      res.status(500).json({
        message: 'Error updating the action',
      });
    }
  })



// ...............................
// Delete Action
// ...............................

router.delete('/action/:id', (req, res) => {
    Actions.remove(req.params.id)
     .then(removed => {
         if(removed === 0) {
             res.status(404),json({ error: "id does not exist"});
         } else {
             res.status(200).json(removed)
         }
     })
     .catch((error) => {
         res.status(500).json({ error: "server is down"});
     });
});



// ...............................

module.exports = router;