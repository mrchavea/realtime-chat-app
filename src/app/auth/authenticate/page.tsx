"use client"

import GradientText from "@/components/GradientText";
import { GradientContainer } from "@/components/ui/GradientContainer";
import { Button, Card, Input, Link } from "@nextui-org/react";
import { SunIcon } from "@radix-ui/react-icons";


export default function AuthenticatePage () {



    


    return (
        <>
        <GradientContainer>

            <Card className="z-20 rounded-xl border-white border-2 border-opacity-50 flex bg-[#131314ee] px-10 py-5 md:max-w-[920px] md:w-[50vw] h-full">

                <div className="flex justify-between pt-10">
                    <section className="w-[40%] h-full flex justify-start items-start text-left">
                        <h1 className="text-2xl font-bold">Inicia sesión</h1>
                    </section>

                    <section className="w-fit h-full flex flex-col items-center gap-3 pt-10">
                        <Input
                        className="sm:min-w-0 sm:max-w-[400px] min-w-full"
                        autoFocus
                        endContent={
                            <SunIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="DNI/NIE"
                        variant="bordered"
                        />
                        <Input
                        className="sm:min-w-0 sm:max-w-[400px] min-w-full"
                        autoFocus
                        endContent={
                            <SunIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Contraseña"
                        variant="bordered"
                        />
                        <Link className="pl-0" color="primary" href="#" size="sm">
                            Forgot password?
                        </Link>
                        
                    </section>
                </div>
                <section className="w-full h-fit inline-flex gap-3 mt-10 justify-end">

                    <Button radius="sm"  color="default" variant="light" onPress={()=>{}}>
                        Registrarse
                    </Button>
                    
                    <Button radius="sm" color="default" onPress={()=>{}}>
                        Iniciar sesión
                    </Button>
                </section>

            </Card>

        </GradientContainer>

        
        </>
    )
}