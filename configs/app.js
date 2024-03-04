//Configuración Express

//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import courseRoutes from '../src/course/courses.routes.js'
import TeacherCourse from '../src/teacherCourse/teacher.routes.js'

//Configuraciones 
const app = express() //Crea el servidor
config()
const port = process.env.PORT || 3200

//Configurar el servidor de express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Declaración de rutas
app.use(userRoutes)
app.use(courseRoutes)
app.use(TeacherCourse)


export const initServer = () => {
    app.listen(port)
    console.error(`Server HTTP running in port ${port}`)
}