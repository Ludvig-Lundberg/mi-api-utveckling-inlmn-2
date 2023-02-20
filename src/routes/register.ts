import express from 'express'
import { body } from 'express-validator'
import { register } from '../controllers/register_controller'
import prisma from '../prisma'
const router = express.Router()

// lägg till användare
router.post('/', [
    body("email").isEmail().withMessage("must be email").bail().custom(async (email:string) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (user) {
            return Promise.reject("Email already in use")
        }
    }),
    body("password")  .isString().withMessage("must be string").bail().isLength({min: 6, max: 191}).withMessage("must be between 3 and 191 characters long"),
    body("first_name").isString().withMessage("must be string").bail().trim().isLength({min: 3, max: 25}).withMessage("must be between 3 and 25 characters long "),
    body("last_name") .isString().withMessage("must be string").bail().trim().isLength({min: 3, max: 25}).withMessage("must be between 3 and 25 characters long ")
], register)


export default router
