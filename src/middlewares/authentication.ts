import { NextFunction, Request, Response } from 'express'
import prisma from '../prisma'
import bcrypt from "bcrypt"
import Debug from 'debug';
import { decode } from 'punycode';

export let requestingUser: any;
const debug = Debug("api-2:authentication")

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization) {
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
    console.log(decodedPayload)
    const [email, password] = decodedPayload.split(":")
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    
    if (!user) {
        return res.status(401).send({
            status: "fail",
            data: "401 Unauthorized"
        })
    }
    
    const result = await bcrypt.compare(password, user.password)
    console.log("plain:", password)
    console.log("hashed:", user.password)
    console.log(result)
    if (result === false) {
        return res.status(401).send({
            status: "fail",
            data: "401 Unauthorized"
        })
    }
    
    requestingUser = user
    
    next()
    
}