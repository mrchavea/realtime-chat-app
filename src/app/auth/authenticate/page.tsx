"use client";

import { GradientContainer } from "@/presentation/shared";
import { LogInForm } from "@/presentation/user";
import { Card } from "@nextui-org/react";

export default function AuthenticatePage() {
  return (
    <>
      <GradientContainer>
        <Card className="z-20 rounded-xl border-white border-2 border-opacity-50 flex px-10 py-5 md:max-w-[920px] md:w-[50vw] h-full">
          <div className="flex flex-col md:flex-row justify-between pt-10 gap-5">
            <section className="w-[40%] h-full flex justify-start items-start text-left">
              <h1 className="text-2xl font-bold">Inicia sesión</h1>
            </section>

            <section className="h-[250px]">
              <LogInForm />
            </section>
          </div>
        </Card>
      </GradientContainer>
    </>
  );
}
