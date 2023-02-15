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
    body("title").isString().withMessage("must be string").bail().isLength({min:3}).withMessage("minimum 3 characters long")
], store)

// PATCH/uppdatera album
router.patch('/:albumId', [
    body("title").isString().withMessage("must be string").bail().isLength({min:3}).withMessage("minimum 3 characters long")
], update)

// POST/connect:a photo till album
router.patch('/:albumId/photos', connect)

export default router
