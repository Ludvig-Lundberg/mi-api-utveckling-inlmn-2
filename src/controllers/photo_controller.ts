import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import { validateUser } from "../middlewares/authentication"
import { requestingUser } from '../middlewares/authentication'
// Create a new debug instance
const debug = Debug('fed22_photos:photo_controller')

// GET alla photos
export const index = async (req: Request, res: Response) => {

    console.log(req.headers.authorization)
    
    try {
        const photos = await prisma.photo.findMany({
            where: {
                user_id: requestingUser.id
            }
        })

        res.send({
            status: "success",
            data: photos,
        })
    } catch (err) {
        debug("Kunde inte hitta photos", err)
        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
        })
    }
}

// specifik photo
export const show = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)
    try {
        const album = await prisma.photo.findUniqueOrThrow({
            where: {
                id: photoId,
            },
        })
        res.send({
            status: "success",
            data: album,
        })
    } catch (err) {
        debug(`hittar inte photo med id: ${photoId}`, err)
        res.status(404).send({
            status: "error",
            message: "404: photo not found"
        })
    }
}

// POST:a photo
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }
    const { title, url, comment } = req.body
    try {
        const photo = await prisma.photo.create({
            data: {
                title,
                url,
                comment,
                user_id: requestingUser.id
            }
        })
        res.send({
            status: "success",
            data: photo
        })
    } catch (err) {
        debug("ERROR when creating photo", req.body, err)

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
