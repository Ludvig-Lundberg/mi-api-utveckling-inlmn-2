import express from "express"
import resource from './_router'
import albums from "./albums"
import photos from "./photos"
import register from "./register"
import { validateUser } from "../middlewares/authentication"

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.use("/register", register)

router.use("/albums", validateUser, albums)

router.use("/photos", validateUser, photos)

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

export default router
