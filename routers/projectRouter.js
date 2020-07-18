const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

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

module.exports = router;