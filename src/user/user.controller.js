//Lógica
'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('Hello World')
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'STUDENT_ROLE'
        let user = new User(data)
        await user.save()
        return res.send({ message: 'Registered succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        let { username, password, email } = req.body
        let usuario = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (usuario && await checkPassword(password, usuario.password)) {
            let loggedUsuario = {

                uid: usuario._id,
                username: usuario.username,
                name: usuario.name
            }
            let token = await generateJwt(loggedUsuario)
            return res.send({
                message: `Welcome ${usuario.name} ${usuario.surname}`,
                usuario,
                token
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Updated user', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //Obtener el id
        let { id } = req.paramss
        //Validar si está logeado y es el mismo X Hoy no lo vemos X
        //Eliminar
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //Verifica que se eliminó
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //Responder
        return res.send({ message: `Account with username ${deletedUser.username} deleted succesfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}