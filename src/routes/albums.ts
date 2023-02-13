/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/album_controller'
const router = express.Router()

// alla users
router.get('/', index)

// specifik user
router.get('/:albumId', show)

// lägg till user
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
