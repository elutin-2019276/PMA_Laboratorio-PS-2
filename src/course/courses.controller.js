'use strict'

import User from '../user/user.model.js'
import Course from './courses.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send({ message: 'Function test is running | Course' })
}

export const save = async (req, res) => {
    try {
        let data = req.body
        let user = await User.findOne({ _id: data.student })
        if (!user) return res.status(404).send({ message: 'Student not found' })
        let course = new Course(data)
        await course.save()
        return res.send({ message: 'Course saved succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving course', err })
    }
}

export const get = async (req, res) => {
    try {
        let courses = await Course.find().populate('student', ['name', 'description'])
        return res.send({ courses })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting courses.' })
    }
}