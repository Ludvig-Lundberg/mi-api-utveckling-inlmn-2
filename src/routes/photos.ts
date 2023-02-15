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
    body("title")   .isString().withMessage("must be string").bail().isLength({min:3}).withMessage("minimum 3 characters long"),
    body("url")     .isString().withMessage("must be string").bail().isURL().withMessage("must be a url"),
    body("comment") .isString().withMessage("must be string").bail().isLength({min:3}).withMessage("minimum 3 characters long")
], store)

// Uppdatera photo
router.patch('/:photoId', [
    body("title")   .optional().isString().withMessage("must be string").bail().isLength({min:3}).withMessage("minimum 3 characters long"),
    body("url")     .optional().isString().withMessage("must be string").bail().isURL().withMessage("must be a url"),
    body("comment") .optional().isString().withMessage("must be string").bail().isLength({min:3}).withMessage("minimum 3 characters long")
], update)


export default router
