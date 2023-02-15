/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update } from '../controllers/photo_controller'
const router = express.Router()

// alla photos
router.get('/', index)

// specifik photo
router.get('/:photoId', show)

// lägg till photo
router.post('/', [
    
], store)

// Uppdatera photo
router.patch('/:photoId', [], update)


export default router
