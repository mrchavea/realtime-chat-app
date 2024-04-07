import GradientText from "@/components/GradientText";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Card } from "@nextui-org/react";

export default function AuthLayout({ children } : {children: React.ReactNode}) {
  return (
    // <section className="h-full w-full flex flex-col items-center pt-4 sm:py-20 px-4">
    //     <div className="sm:px-8 sm:py-10 bg-white dark:bg-neutral-900 rounded w-full sm:max-w-[450px] min-h-[420px] pt-5 sm:p-10 sm:shadow-lg dark:shadow-neutral-800">
    //         {children}
    //     </div>
    // </section>
    <>
      <AnimatedBackground/>
      <main className="relative min-h-screen w-full">
        <header className="w-full h-fit relative ml-auto top-[100px] inline-flex items-center justify-center text-6xl gap-2 font-extrabold">
          <div>
            <p>Bienvenido al <GradientText text="banco"/> del futuro</p>
          </div>
        </header>
        <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 flex justify-center items-center w-full sm:max-w-[800px] sm:h-[460px]">
          {children}
        </div>
      </main>
    </>
  );
}
