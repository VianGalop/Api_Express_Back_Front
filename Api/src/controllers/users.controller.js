import { pool } from '../config/db.js'
import fs from 'node:fs/promises'

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM all_users')
    // return rows[0]
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body
    const { filename } = req.file

    if (!name || !email.includes('@') || !role || !filename) {
      return res.status(400).json({ message: 'Falta datos' })
    }
    /*
    if (Object.keys(req.files).length === undefined) {
      return res.status(400).json('No se ha encontrado ningún archivo.')
    } */

    const sql = 'INSERT INTO all_users(name, email, role, picture) VALUES (?,?,?,?)'
    const result = await pool.execute(sql, [name, email, role, filename])

    // Validar el id del registro insertado
    if (!result[0].insertId) {
      await fs.unlink(`/uploads/${req.file.filename}`)
      return res.status(500).json({ message: 'Error al crear el usuario.' })
    }

    // Traer el usuario insertado
    const [user] = await pool.execute(
      'SELECT name, email, role, picture FROM all_users WHERE id_user = ?',
      [result[0].insertId]
    )

    // Mensaje al cliente
    res.status(201).json({ message: 'Usuario creado.', user })
  } catch (error) {
    console.log(error)
    const message = 'Error interno'
    const statusCode = 500
    await fs.unlink(`/uploads/${req.file.filename}`)

    res.status(statusCode).json({ message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM all_users WHERE id_user = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' })
  }
}

export const getUpdate = async (req, res) => {
  try {
    const { name, email, role } = req.body
    const { filename } = req.file

    if (!name || !email.includes('@') || !role || !filename) {
      await fs.unlink(`/uploads/${req.file.filename}`)
      return res.status(400).json({ message: 'Falta datos' })
    }

    // traer nombre el archivo que ya existe de la carpeta
    /* const image = await pool.query('SELECT picture FROM all_users WHERE id_user = ?', [req.params.id])
    const nameFile = image[0][0].picture */

    const sql = 'UPDATE all_users SET name= ?, email=? , role= ?, picture = ? WHERE id_user= ?'
    const result = await pool.execute(sql, [name, email, role, filename, req.params.id])

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: 'No se encontro ningun usuario' })
    }

    // Mensaje al cliente
    res.status(200).json({ message: `Usuario actualizado:${result}` })
  } catch (error) {
    console.log(error)
    let message = 'Error interno'
    let statusCode = 500
    await fs.unlink(`/uploads/${req.file.filename}`)

    // Validar si el error es por un email duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
    if (error?.errno === 1062) {
      message = 'El email ya existe'
      statusCode = 400
      await fs.unlink(`/uploads/${req.file.filename}`)
    }

    res.status(statusCode).json({ message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    // traer nombre el archivo que ya existe de la carpeta
    const image = await pool.query('SELECT picture FROM all_users WHERE id_user = ?', [req.params.id])
    const nameFile = image[0][0].picture
    const [result] = await pool.query('DELETE FROM all_users WHERE id_user = ?', [req.params.id])
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    // borrar el archivo de la carpeta.
    const fileExit = `./uploads/${nameFile}`
    console.log('ruta archivo' + fileExit)
    fs.access(fileExit)
      .then(async () => {
        await fs.unlink(fileExit)
      })
    res.sendStatus(204).json({ message: 'Usuario eliminado' })
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' })
  }
}
