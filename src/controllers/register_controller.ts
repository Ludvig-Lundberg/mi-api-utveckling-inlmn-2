import Debug from 'debug'
const bcrypt = require('bcrypt');
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('fed22_photos:register_controller')

export const register = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }

    const validatedData = matchedData(req)

    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    
    validatedData.password = hashedPassword

    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: validatedData.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }
        })
        res.status(201).send({
            status: "success",
            data: user
        })
    } catch (err) {
        debug("ERROR when creating user", req.body, err)

        res.status(500).send({
            status: "error",
            message: "Error creating user in database"
        })
    }
}