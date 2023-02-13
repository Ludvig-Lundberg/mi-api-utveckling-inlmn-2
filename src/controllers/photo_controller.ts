import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('fed22_photos:photo_controller')

// gör ny index funktion

// kolla header.authorization, ta ut lösenord och användar namn man skickar in

// kolla email mot server, ta ut id på user

// ta lösenord från header, gör om till base64 och jämför lösenord med sever

// nej? unauthorized

// ja? ta ut bilder med som har samma userId som användarens id


// GET alla photos
export const index = async (req: Request, res: Response) => {
    try {
        const photos = await prisma.photo.findMany()

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
    const { title, url, comment, user_id } = req.body
    try {
        const photo = await prisma.photo.create({
            data: {
                title,
                url,
                comment,
                user_id,
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
