"use client"

import SignUpForm from "./SignUpForm";

export default function RegisterPage() {
  return (
    <>       
      <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 dark:text-white pb-4">
        Crea tu cuenta ahora
      </p>
      <SignUpForm />
    </>
  );
}
