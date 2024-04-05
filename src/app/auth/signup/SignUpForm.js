"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import {useForm} from "react-hook-form"
import {FingerPrintIcon} from "@heroicons/react/24/solid"
import Link from "next/link";
import {Button} from "@nextui-org/button";

export default function RegisterForm () {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false)
  const {register, handleSubmit, formState: { errors }} = useForm({mode: "onSubmit"})
  
  const [error, setError] = useState("");


  const onSubmit = async (data, event) => {
    event.preventDefault();
    setError("")
    setLoading(true);

    //setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      setLoading(false);
      if(res.ok) signIn(undefined, { callbackUrl: "/" });



      res.json().then(error => setError(error?.message))
      

    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const input_style =
    "block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-neutral-900 focus:outline-none";

  const password_style =
    "relative w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus-within:border-neutral-900 focus:outline-none";

  const error_style = 
    "text-red-400 text-sm font-medium pb-2 pt-1"

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mb-6">
        <input
          type="text"
          {...register("name"
          , {required: true, 
            maxLength: {
              value: 20,
              message: 'Prueba con un nombre más corto'
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Introduce un nombre válido'
              }
          }
          )
        }
          placeholder="Nombre"
          className={`${input_style}`}
        />
        {errors.name?.message && <p className={`${error_style}`}>{errors.name.message}</p>}
      </div>

      <div className="mb-6">
        <input
          type="text"
          {...register("surname", {required: true, 
            maxLength: {
              value: 30,
              message: 'Prueba con un apellido más corto'
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Introduce un apellido válido'
              }
          })}
          placeholder="Apellidos"
          className={`${input_style}`}
        />
        {errors.surname?.message && <p className={`${error_style}`}>{errors.surname.message}</p>}
      </div>

      <div className="mb-6">
        <input
          type="email"
          {...register("email", {required: true, 
            maxLength: {
              value: 30,
              message: 'Prueba con un correo más corto'
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email",
            }
          })}
          placeholder="Correo electrónico"
          className={`${input_style}`}
        />
        {errors.email?.message && <p className={`${error_style}`}>{errors.email.message}</p>}

      </div>
      <div className="mb-6">
        <div className={`${password_style}`}>
          <input
            type={`${show ? "text" : "password"}`}
            {...register("password", {required: true, 
              maxLength: {
                value: 25,
                message: 'Prueba con una contraseña más corta'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'La contraseña no es robusta'
                },
            }
            )}
            placeholder="Contraseña"
            className="focus:outline-none border-none w-[85%]"
          />
          <span className='absolute right-0 top-3 flex items-center px-4' onClick={() => setShow(!show)}>
            <FingerPrintIcon className="cursor-pointer h-6 w-6 text-slate-600"/>
          </span>
        </div>

        {errors.password?.message && <p className={`${error_style}`}>{errors.password.message}</p>}
        <p className="text-gray-600 text-sm mt-1">* Debe contener al menos 8 caracteres y un número.</p>
      </div>

      <div class="flex items-center my-2">
        <input id="comercial" type="checkbox" value="" class="min-w-[1rem] h-4 text-blue-500 border-0 rounded-md focus:ring-1 accent-blue-500"
        {...register("comercial", {required: false})}/>
        <label for="comercial" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quiero recibir ofertas y novedades</label>
      </div>

      <div class="flex items-center my-2">
        <input id="terminos_privacidad" type="checkbox" class="min-w-[1rem] h-4 text-blue-500 border-0 rounded-md focus:ring-1 accent-blue-500"
        {...register("terminos_privacidad", 
        {required: {
          value:true,
          message: 'Tienes que aceptar los términos y condiciones'
          }})}/>
        <label for="terminos_privacidad" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Acepto los
          <Link href={'/#Terminos'} className='text-blue-500'> Términos de servicio </Link>
          y la
          <Link href={'/#Privacidad'} className='text-blue-500'> Política de privacidad</Link>
        </label>
      </div>
      {errors.terminos_privacidad?.message && <p className={`${error_style}`}>{errors.terminos_privacidad.message}</p>}

      {error && (
        <p className={`${error_style} `}>{error}</p>
      )}
      
      <div className="mt-5">
        <Button
          type="submit"
          className="w-full h-[50px]"
          isLoading={loading}
          radius="sm"
        >
          {loading ? "Comprobando..." : "Crear cuenta"}
        </Button>
      </div>

    </form>
  );
};
