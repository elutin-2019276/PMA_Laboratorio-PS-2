'use strict'

import { Schema, model } from 'mongoose'

const courseSchema = Schema({
    name: {
        type: String,
        enum: ['Matemática', 'Programación', 'Idioma Inglés'],
        required: true
    },
    description: {
        type: String,
        required: false
    },
    student: {
        type: String,
        required: true
    }
})

export default model('course', courseSchema)