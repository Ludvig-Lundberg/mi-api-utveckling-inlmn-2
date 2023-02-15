import Debug from 'debug'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import bcrypt from "bcrypt"
import user from "../types/index"

// Create a new debug instance
const debug = Debug('fed22_photos:validation')

export let requestingUser: any;

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        debug("ingen authorizering")

        return res.status(401).send({
            status: "fail",
            data: "Unauthorized"
        })
    }

    const [authSchema, base64Payload] = req.headers.authorization.split(" ")

    if (authSchema.toLowerCase() !== "basic") {
        return res.status(401).send({
            status: "fail",
            data: "401 Unauthorized"
        })
    }

    const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii")

    const [email, password] = decodedPayload.split(":")

    const user = await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
    if (!user) {
        debug("email:", email, "does not exist")

        return res.status(401).send({
            status: "fail",
            data: "401 Unauthorized"
        })
    }


    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        debug("password does not match user:", email)

        return res.status(401).send({
            status: "fail",
            data: "401 Unauthorized"
        })
    }


    requestingUser = user

    next()

}