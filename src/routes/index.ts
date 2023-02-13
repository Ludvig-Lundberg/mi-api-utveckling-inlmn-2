import express from "express"
import resource from './_router'
import users from "./users"
import albums from "./albums"
import photos from "./photos"

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

router.use("/users", users)

router.use("/albums", albums)

router.use("/photos", photos)

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

export default router
