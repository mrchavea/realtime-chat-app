import { useContext, useState } from "react";
import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Checkbox, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/presentation/shared/components";
import { AuthContext, useAuthContext } from "../contexts/AuthContext";

interface LogInCredentials {
  email: string;
  password: string;
}

export const LogInForm = () => {
  const { handleLogInCallback } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
      // terms: false,
    }
  });

  const onSubmit: SubmitHandler<LogInCredentials> = async (form_data) => {
    // event.preventDefault();
    try {
      setError("");
      setIsLoading(true);

      const [success, errorMessage] = await handleLogInCallback(form_data);
      if (!success) return setError(errorMessage);

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Error inesperado");
    } finally {
      setIsLoading(false);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-4">
      <div className="flex flex-col mt-4 w-full max-w-xs gap-4">
        <Input
          label="Email"
          variant="bordered"
          radius="sm"
          onClear={() => console.log("clear")}
          errorMessage={errors.email && errors.email.message}
          formNoValidate={errors.email ? true : false}
          validationState={errors.email ? "invalid" : "valid"}
          {...emailInput}
        />
        <Input
          label="Contraseña"
          variant="bordered"
          radius="sm"
          isClearable={false}
          endContent={
            <button className="h-6 w-6 focus:outline-none" type="button" onClick={() => setShow(!show)}>
              {show ? <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> : <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />}
            </button>
          }
          type={show ? "text" : "password"}
          errorMessage={errors.password && errors.password.message}
          validationState={errors.password ? "invalid" : "valid"}
          {...passwordInput}
        />
        {error && <p className="text-danger text-tiny font-medium pb-2 pt-1">{error}</p>}
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
      <div className="flex items-center gap-4 absolute bottom-10 right-10">
        <Button size="md" variant="solid" radius="sm" type="submit" color="primary" isDisabled={isLoading} isLoading={isLoading}>
          Siguiente
        </Button>
      </div>
    </form>
  );
};
