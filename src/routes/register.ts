/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { register } from '../controllers/register_controller'
const router = express.Router()

// lägg till photo
router.post('/', [
    
], register)


export default router
