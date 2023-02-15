import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { requestingUser } from '../middlewares/authentication'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('fed22_photos:album_controller')

// GET alla albums
export const index = async (req: Request, res: Response) => {
    try {
        const albums = await prisma.album.findMany({
            where: {
                user_id: requestingUser.id
            }
        })

        res.send({
            status: "success",
            data: albums,
        })
    } catch (err) {
        debug("Kunde inte hitta albums", err)
        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
        })
    }
}

// specifik album
export const show = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    try {
        const album = await prisma.album.findFirst({
            where: {
                id: albumId,
                user_id: requestingUser.id,
            },
        })
        if (!album) {
            res.status(401).send({
                status: "fail",
                data: "401 unauthorized"
            })
            return
        }
        res.send({
            status: "success",
            data: album,
        })
    } catch (err) {
        debug(`hittar inte album med id: ${albumId}`, err)
        res.status(404).send({
            status: "error",
            message: "404: album not found"
        })
    }
}

// POST:a album
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }
    try {
        const album = await prisma.album.create({
            data: {
                title: req.body.title,
                user_id: requestingUser.id
            }
        })
        res.send({
            status: "success",
            data: album
        })
    } catch (err) {
        debug("ERROR when creating album", req.body, err)

        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
        })
    }
}

// PATCH/uppdatera album
export const update = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)


    try {
        const album = await prisma.album.findFirst({
            where: {
                id: albumId,
                user_id: requestingUser.id,
            }
        })
        if (!album) {
            res.status(401).send({
                status: "fail",
                data: "401 unauthorized"
            })
            return
        }

        const updatedAlbum = await prisma.album.update({
            where: {
                id: albumId
            },
            data: {
                title: req.body.title
            }
        })
        res.send({
            status: "success",
            data: updatedAlbum
        })
    } catch (err) {
        debug("ERROR when updating ALBUM", req.body, err)

        res.status(500).send({
            status: "error",
            message: "500: Internal Server Error"
        })
    }

}

// POST/connect:a photo till album
export const connect = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    const photoId = req.body.photo_id
    try {
        // kolla om albumet tillhör användaren
        const album = await prisma.album.findFirst({
            where: {
                id: albumId,
                user_id: requestingUser.id,
            }
        })
        if (!album) {
            res.status(401).send({
                status: "fail",
                data: "401 unauthorized, NOT UR ALBUM"
            })
            return
        }
        // kolla om fotot tillhör användaren
        const photo = await prisma.photo.findFirst({
            where: {
                id: photoId,
                user_id: requestingUser.id
            }
        })
        if (!photo) {
            res.status(401).send({
                status: "fail",
                data: "401 unauthorized, NOT UR PHOTO"
            })
            return
        }
        const updatedAlbum = await prisma.album.update({
            where: {
                id: albumId
            },
            data: {
                photo: {
                    connect: {
                        id: photoId
                    }
                }
            },
            include: {
                photo: true
            }
        })
        res.send({
            status: "success",
            data: updatedAlbum
        })
    } catch (err) {
        debug("ERROR when connecting PHOTO to ALBUM", req.body, err)

        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
        })
    }
}
