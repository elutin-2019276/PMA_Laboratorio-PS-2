'use strict'
//Rutas del usuario

import express from 'express'
import {
    validateJwt,
    TEACHER_ROLE
} from '../middlewares/validate-jwt.js'
import {
    test,
    register,
    login,
    update,
    deleteU
} from './user.controller.js'

const api = express.Router()

api.get('/test', [validateJwt, TEACHER_ROLE], test)

api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteU)

api.post('/register', register)
api.post('/login', login)

export default api