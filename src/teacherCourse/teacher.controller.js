'use strict'

import User from '../user/user.model.js'
import TeacherCourse from './teacher.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send({ message: 'Function test is running | Course' })
}

export const save = async (req, res) => {
    try {
        let data = req.body
        let user = await User.findOne({ _id: data.teacher })
        if (!user) return res.status(404).send({ message: 'Teacher not found' })
        let teacherCourse = new TeacherCourse(data)
        await teacherCourse.save()
        return res.send({ message: 'Course saved succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving course', err })
    }
}

export const deleteC = async (req, res) => {
    try {
        let { id } = req.params
        let deletedCourse = await TeacherCourse.deleteOne({ _id: id })
        if (deletedCourse.deletedCount == 0) return res.status(404).send({ message: 'Course not found, not deleted' })
        return res.send({ message: 'Deleted course succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting course.' })
    }
}

export const updateC = async (req, res) => {
    try {
        //Capturar el id (a quien voy a actualizar)
        let { id } = req.params
        //Capturar la data
        let data = req.body
        //Validar que vengan datos **
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Actualizar
        let updatedCourse = await TeacherCourse.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('teacher', ['name', 'description'])
        //Validar la actualización
        if (!updatedCourse) return res.status(404).send({ message: 'Course not found, not updated' })
        //Responder si todo sale bien
        return res.send({ message: 'Course updated successfully', updatedCourse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating course' })
    }
}

export const search = async (req, res) => {
    try {
        let teacherCourse = await TeacherCourse.find().populate('teacher', ['name', 'description'])
        return res.send({ teacherCourse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting courses.' })
    }
}
