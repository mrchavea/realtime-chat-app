// import prisma from "../../../prisma";
// import { hash } from "bcryptjs";
// import { randomUUID } from "crypto";

// export const getUserByEmail = async (email) =>
//   await prisma.user.findUnique({
//     where: {
//       email: email
//     }
//   });

// export const createUserAndAccount = async (user) => {
//   try {
//     const hashed_password = await hash(user.password, 12);
//     const accountId = randomUUID();
//     const userData = {
//       data: {
//         name: user.name,
//         surname: user.surname,
//         email: user.email,
//         password: hashed_password,
//         emailVerified: null,
//         accountId: accountId.toString(),
//         accounts: {
//           create: {
//             id: accountId.toString(),
//             type: "oauth",
//             provider: "credentials"
//           }
//         }
//       }
//     };
//     const createdUser = await prisma.user.create(userData);
//     if (!createdUser) throw new Error("No se ha podido crear la cuenta");
//     return createdUser;
//   } catch (err) {
//     return { err, message: "Ha habido un error al registrarse" };
//   }
// };
