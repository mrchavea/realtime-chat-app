import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="relative flex flex-col flex-nowrap w-full min-h-screen h-full">
      <nav className="sticky top-0  flex w-full justify-between items-center min-h-[70px] border-b-1 border-gray-800 border-opacity-30 bg-gray-700">
        <Skeleton disableAnimation className="ml-10 w-10 h-10 rounded-full" />
      </nav>
      <main className="h-full w-full px-10 pt-10 mb-[20px]">
        <ul className="text-xl flex flex-col gap-4 w-full h-[500px] ">
          <Skeleton disableAnimation className="h-[50px] w-1/6 rounded-lg">
            <li className="gap-2 text-white w-fit rounded-md flex flex-row px-3 py-1 self-end bg-indigo-500">
              <span className="w-[30px]"></span>
              <span className="mt-2 self-end text-[12px] text-gray-300"></span>
            </li>
          </Skeleton>
          <Skeleton disableAnimation className="h-[50px] w-1/5 rounded-lg">
            <li className="gap-2 text-white w-fit rounded-md flex flex-row px-3 py-1 self-start bg-indigo-500">
              <span className="w-[30px]"></span>
              <span className="mt-2 self-end text-[12px] text-gray-300"></span>
            </li>
          </Skeleton>
        </ul>
      </main>
      <footer className="sticky bottom-5 flex justify-center items-center px-10 pb-5 w-full h-[110px]"></footer>
    </div>
  );
}
