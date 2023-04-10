const Validator = require('fastest-validator');
const models = require('../models')
// Define uma função chamada index que recebe as requisições e respostas HTTP
function save(req, res) {
    const posts = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData
    }

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "100" },
        categoryId: { type: "number", optional: false },
    }

    const v = new Validator();
    const validationResponse = v.validate(posts, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if (result !== null) {
            models.Post.create(posts).then(result => {
                res.status(201).json({
                    message: 'Post created successfully',
                    post: result
                })
            }).catch(error => {
                res.status(500).json({
                    messagem: 'Something went wrong',
                    error: error
                })
            });
        } else {
            res.status(400).json({
                messagem: 'Invalid category'
            })
        }
    });
}

function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Post not found'
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something when wrong'
        })
    });
}

function index(req, res) {
    models.Post.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        message: 'Something went wrong'
    })
}

function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }
    const userId = 1;

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "100" },
        categoryId: { type: "number", optional: false },
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if (result !== null) {
            models.Post.update(updatedPost, { where: { id: id, userId: userId } }).then(result => {
                res.status(200).json({
                    message: 'Post updates succesfully',
                    post: updatedPost
                });
            }).catch(error => {
                res.status(502).json({
                    messagem: 'Something went wrong',
                    error: error
                });
            })
        } else {
            res.status(400).json({
                messagem: 'Invalid category'
            })
        }
    });
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({ where: { id: id, userId: userId } }).then(result => {
        res.status(200).json({
            message: 'Post deleted succesfully'
        })
    }).catch(error => {
        res.status(502)({
            message: 'Something went wrong',
            error: error
        })
    })
}

// Exporta um objeto contendo o método index
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
};
