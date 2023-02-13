import express from 'express'
import { body } from 'express-validator'
import { register } from '../controllers/register_controller'
import prisma from '../prisma'
const router = express.Router()

// lägg till användare
router.post('/', [
    body("email").isEmail().bail().custom(async (email:string) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (user) {
            return Promise.reject("Email already in use")
        }
    }),
    body("password").isString().isLength({min: 6}),
    body("first_name").isString().isLength({min: 3}),
    body("last_name").isString().isLength({min: 3})
], register)


export default router
