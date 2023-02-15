/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, connect } from '../controllers/album_controller'
const router = express.Router()

// GET/alla albums
router.get('/', index)

// GET/specifik album
router.get('/:albumId', show)

// POST/lägg till album
router.post('/', [
    
], store)

// PATCH/uppdatera album
router.patch('/:albumId', [], update)

// POST/connect:a photo till album
router.patch('/:albumId/photos', connect)

export default router
