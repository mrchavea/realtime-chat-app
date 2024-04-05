import { NextResponse } from "next/server";
import {getUserByEmail} from "@/../../src/repositories/user"
import {createUserAndAccount} from "@/../../src/repositories/user"

export default async function POST(req, res) {
  try {
    // const validate = ajv.getSchema("user")
    // const validUser = validate(req.body)
    // if(!validUser){
    //   console.log("SCHEMA ERR", validate.errors)
    //   return res.status(400).json({
    //     error: 'Error en los datos'
    //   })
    // }

    const userData = req.body

    //If existing email, throw error
    const existingUser = await getUserByEmail(userData.email)
    if (existingUser){
      return res.status(400).json({
        error: 'Ya existe un usuario con ese email.'
      },)
    }

    const createdUser = await createUserAndAccount(userData)
    if (createdUser.err) throw new Error(createdUser.message)
    console.log("USER AFTER PRISMA", createdUser, userData)
    //TO DO: Check if email already exists in DB
    //TO DO: Validate email
    //TO DO: Add schema validation

    res.status(200).json({
      user: {
        name: createdUser.name,
        email: createdUser.email,
      }
    },)

  } catch (error) {
    res.status(500).json({message: error.message ?? "Ha habido un problema al registrarse"})
  }
}
