/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/photo_controller'
const router = express.Router()

// alla photos
router.get('/', index)

// specifik photo
router.get('/:photoId', show)

// lägg till photo
router.post('/', [
    
], store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:resourceId', [], update)

/**
 * DELETE /resource/:resourceId
 */
router.delete('/:resourceId', destroy)

export default router
