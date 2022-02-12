const postRouter = require('express').Router()
const { index, createOrEdit, store, update, view, destroy } = require('../../controllers/admin/postController')
const { postValidators } = require('../../validators/admin/post-validators')

postRouter.get('/',index)
postRouter.get('/create', createOrEdit)
postRouter.post('/', postValidators, store)
postRouter.get('/edit/:id', createOrEdit)
postRouter.put('/:id', postValidators, update)
postRouter.get('/view/:id', view)
postRouter.delete('/delete/:id', destroy)

module.exports = postRouter