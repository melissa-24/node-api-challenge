const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// ...............................
// Get projects
// ...............................
router.get('/', (req, res) => {;
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving projects', });
        });
});

router.get('/:id', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(500).json.apply({ error: "the project id could not be found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: "the project could not be found"});
        });
});

// ...............................
// Create project
// ...............................

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(post => {
            if(!req.body.name || !req.body.description) {
                res.status(400).json({ error: "Please provide name and description for project"})
            } else {
                res.status(201).json(post)
            }
        })
        .catch(error => {
            res.statys(500).json({ error: "There was a problem saving data"});
        });
});


// ...............................
// Update project
// ...............................

router.put('/:id', (req, res) => {
    const update = req.body;

    Projects.getProjectActions(req.params.id)
        .then(() => {
            if(!update.name || !update.description) {
                res.status(400).json({ error: "Please provide name and description for project"})
            } else {
                Projects.update(req.params.id, update)
                    .then(() => {
                        res.status(200).json(update);
                    })
                    .catch((error) => {
                        res.status(500).json({ error: "Could not be saved"});
                    });
            }
        })
        .catch((error) => {
            res.status(404).json({ error: "the post id does not exist"});
        });
});


// ...............................
// Delete project
// ...............................

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(removed => {
            if(removed === 0) {
                res.status(404).json({ error: "this id does not exist"});
            } else {
                res.status(200).json(removed);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Server is down."});
        });
});


// ...............................

module.exports = router;