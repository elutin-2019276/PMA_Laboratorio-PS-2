'use strict'

import { Schema, model } from 'mongoose'

const teacherSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    teacher: {
        type: String,
        required: true
    }
})

export default model('teacher', teacherSchema)