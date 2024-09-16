import { Title } from "../components/common/texts";
import { Button } from "../components/common/button";

import { MdEvent } from "react-icons/md";
import { FaHome, FaSun, FaMoon } from "react-icons/fa";

export const DashBoard = () => {
   return (
      <main className="w-screen h-screen px-96">
         <header className="flex flex-col w-full h-44 p-4 bg-red-400">
            <nav className="flex justify-between items-center w-full">
               <Title
                  text="Dashboard"
                  style="font-semibold font-poppins text-3xl text-white"
               />
               <div className="flex items-center gap-5">
                  <Button
                     icon={<FaHome />}
                     text="Inicio"
                     styleIcon="text-2xl"
                     styleButton="items-center gap-2 font-roboto font-medium text-white text-xl"
                  />
                  <Button
                     icon={<MdEvent />}
                     text="Eventos"
                     styleIcon="text-2xl"
                     styleButton="items-center gap-2 font-roboto font-medium text-white text-xl"
                  />
                  <Button
                     icon={<FaSun />}
                     styleIcon="relative top-0.5 text-2xl text-white"
                  />
               </div>
            </nav>
         </header>
      </main>
   );
};
