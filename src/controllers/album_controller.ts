/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('fed22_photos:album_controller')

// GET alla albums
export const index = async (req: Request, res: Response) => {
    try {
        const albums = await prisma.album.findMany()

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
        const album = await prisma.album.findUniqueOrThrow({
            where: {
                id: albumId,
            },
        })
        res.send({
            status: "success",
            data: album,
        })
    } catch (err) {
        debug(`hittar inte album med id: ${albumId}`, err)
        res.status(500).send({
            status: "error",
            message: "500: Internal server error"
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
                user_id: req.body.user_id
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
