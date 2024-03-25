import { Router } from 'express'
import { getUsers, createUser, getUserById, deleteUser, getUpdate } from '../controllers/users.controller.js'
import { uploadImagen } from '../config/multer.js'

const router = Router()

router.get('/all', getUsers)
router.post('/create', uploadImagen.single('picture'), createUser)
router.get('/:id', getUserById)
router.patch('/update/:id', uploadImagen.single('picture'), getUpdate)
router.delete('/delete/:id', deleteUser)

export default router
