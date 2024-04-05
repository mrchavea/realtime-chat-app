"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { getSession } from "next-auth/react";
import baseURL from "@/lib/baseURL";

export const SigInForm = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const logInRedirection = async () => {
    const session = await getSession();
    console.log("Session", session);
    //If admin, redirect to it dashboard
    if (session.user?.garage)
      router.push(`${baseURL}/admin/${session.user.garage}/comments`);
    else router.push(callbackUrl);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      //setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl
      });

      setLoading(false);

      console.log("SIGIN", res);
      if (!res?.error) await logInRedirection();
      else setError("Contraseña o correo incorrecto");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const input_style =
    "block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-neutral-900 focus:outline-none";

  const password_style =
    "relative w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus-within:border-neutral-900 focus:outline-none";

  const error_style = "text-red-400 text-sm font-medium pb-2 pt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <input
          type="email"
          {...register("email", {
            required: true,
            maxLength: {
              value: 30,
              message: "Prueba con un correo más corto"
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email"
            }
          })}
          placeholder="Correo electrónico"
          className={`${input_style}`}
        />
      </div>
      {errors.email?.message && (
        <p className={`${error_style}`}>{errors.email.message}</p>
      )}

      <div className="mb-6">
        <div className={`${password_style}`}>
          <input
            type={`${show ? "text" : "password"}`}
            {...register("password", { required: true })}
            placeholder="Contraseña"
            className="focus:outline-none border-none w-[85%]"
          />
          <span
            className="absolute right-0 top-3 flex items-center px-4"
            onClick={() => setShow(!show)}
          >
            <FingerPrintIcon className="cursor-pointer h-6 w-6 text-slate-600" />
          </span>
        </div>

        {errors.password?.message && (
          <p className={`${error_style}`}>{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm font-medium pb-2 pt-1">{error}</p>
      )}

      <Button
        className="w-full h-[50px]"
        radius="sm"
        isLoading={loading}
        type="submit"
      >
        {loading ? "Comprobando..." : "Iniciar sesión"}
      </Button>

      <div class="w-full flex items-center justify-between py-5">
        <hr class="w-full bg-gray-400" />
        <p class="text-base font-medium leading-4 px-2.5 text-gray-400">O</p>
        <hr class="w-full bg-gray-400  " />
      </div>

      {children}
    </form>
  );
};
