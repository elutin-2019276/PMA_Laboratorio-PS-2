'use strict'

import { Router } from 'express'

import {
    deleteC,
    save,
    search,
    test,
    updateC
} from './teacher.controller.js'
import {
    TEACHER_ROLE,
    validateJwt,
} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveCurse', [validateJwt], save)
api.get('/test', test)
api.put('/updateCourse/:id', [validateJwt, TEACHER_ROLE], updateC)
api.delete('/deleteCourse/:id', [validateJwt, TEACHER_ROLE], deleteC)
api.get('/getCourse', [validateJwt, TEACHER_ROLE], search)


export default api