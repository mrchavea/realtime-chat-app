"use client";

import { useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Checkbox, Input } from "@nextui-org/react";

interface LogInCredentials{
  email:string,
  password:string
}

export const LogInForm = ({ children }: {children?:React.ReactNode | undefined}) => {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      // terms: false,
    },
  });

  const onSubmit: SubmitHandler<LogInCredentials> = async (data) => {
    // event.preventDefault();
    try {
      setError("");
      setLoading(true);
      //setFormValues({ email: "", password: "" });

      const response:any = await fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        body: JSON.stringify({email: data.email, password: data.password}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })

      setLoading(false);

      console.log("SIGIN", response);
      // if (!response?.error) await logInRedirection();
      // else setError("Contraseña o correo incorrecto");
    } catch (error) {
      setLoading(false);
      // setError(error);
    }
  };

  const emailInput = register("email", {
    required: true,
    maxLength: {
      value: 30,
      message: "Prueba con un correo más corto"
    },
    pattern: {
      value: /^\S+@\S+$/i,
      message: "No es un correo válido"
    }
  });

  const passwordInput = register("password", { 
    required: true
  });

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4"
      >
        <div className="flex flex-col mt-4 w-full max-w-xs gap-4">
          <Input
            label="Email"
            variant="underlined"
            radius="sm"
            onClear={() => console.log("clear")}
            errorMessage={errors.email && errors.email.message}
            formNoValidate={errors.email ? true : false}
            validationState={errors.email ? "invalid" : "valid"}
            {...emailInput}
          />
          <Input
            label="Contraseña"
            variant="underlined"
            radius="sm"
            onClear={() => console.log("clear")}
            errorMessage={errors.password && errors.password.message}
            validationState={errors.password ? "invalid" : "valid"}
            {...passwordInput}
          />
        </div>
        {/* <Controller
          name="terms"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              color="warning"
              onBlur={onBlur}
              onChange={onChange}
              isSelected={value}
            >
              Accept terms & conditions
            </Checkbox>
          )}
        /> */}
        <div className="flex items-center gap-4 absolute bottom-10 right-10 ">
          <Button variant="solid" radius="sm" type="submit" color="primary">
            Siguiente
          </Button>
        </div>
      </form>
  );
};
