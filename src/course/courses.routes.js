'use strict'

import { Router } from 'express'

import {
    get,
    save,
    test,
} from './courses.controller.js'
import {
    validateJwt,
    STUDENT_ROLE,
} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/save', [validateJwt, STUDENT_ROLE], save)

api.get('/get', [validateJwt], get)
api.get('/test', test)

export default api