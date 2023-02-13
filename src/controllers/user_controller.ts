import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('fed22_photos:user_controller')

// GET alla users
export const index = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()

        res.send({
            status: "success",
            data: users,
        })
    } catch (err) {
        debug("Kunde inte hitta users", err)
        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
        })
    }
}

// specifik user
export const show = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        })
        res.send({
            status: "success",
            data: user,
        })
    } catch (err) {
        debug(`hittar inte user med id: ${userId}`, err)
        res.status(404).send({
            status: "error",
            message: "404: user not found"
        })
    }
}

// POST:a user
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }
    const  {email, password, first_name, last_name} = req.body
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                first_name,
                last_name,
            }
        })
        res.send({
            status: "success",
            data: user
        })
    } catch (err) {
        debug("ERROR when creating user", req.body, err)

        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
        })
    }
}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
