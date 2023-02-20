import express from "express"
import albums from "./albums"
import photos from "./photos"
import register from "./register"
import { validateUser } from "../middlewares/authentication"
const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.use("/register", register)

router.use("/albums", validateUser, albums)

router.use("/photos", validateUser, photos)

export default router
