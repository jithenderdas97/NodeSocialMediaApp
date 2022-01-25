const postRouter = require('express').Router()
const { index, createOrEdit, store, view, destroy } = require('../../controllers/admin/postController')

postRouter.get('/',index)
postRouter.get('/:type/:id?', createOrEdit)
postRouter.post('/', store)
postRouter.get('/view/:id', view)
postRouter.get('/delete/:id', destroy)

module.exports = postRouter