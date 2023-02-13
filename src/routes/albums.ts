/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/album_controller'
const router = express.Router()

// alla albums
router.get('/', index)

// specifik album
router.get('/:albumId', show)

// lägg till album
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