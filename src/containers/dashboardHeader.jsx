import { Button } from "../components/common/button";
import { Text, Title, IconText } from "../components/common/texts";

import { BsTable } from "react-icons/bs";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaHome, FaSun, FaMoon } from "react-icons/fa";

export const DashboardHeader = () => {
   return (
      <header className="flex flex-col gap-10 rounded-b w-full h-52 py-5 px-6 bg-slate-600">
         <nav className="flex justify-between items-center w-full">
            <Text
               text="Dashboard"
               style="font-bold font-poppins text-3xl text-white"
            />
            <div className="flex items-center gap-5">
               <Button
                  icon={<FaHome />}
                  text="Inicio"
                  styleIcon="text-2xl"
                  styleButton="items-center gap-2 font-roboto font-medium text-white text-xl"
               />
               <Button
                  icon={<BsTable />}
                  text="Clasificaciones"
                  styleIcon="text-xl"
                  styleButton="items-center gap-2 font-roboto font-medium text-white text-xl"
               />
               <Button
                  icon={<FaSun />}
                  styleIcon="relative top-0.5 text-3xl text-white"
               />
            </div>
         </nav>
         <section className="flex flex-col justify-center gap-2 w-full flex-grow">
            <Title
               text="MUJERES PRINCIPIANTES"
               style="tracking-widest font-medium font-montserrat text-4xl text-white"
            />
            <IconText
               icon={<MdOutlineEmojiEvents />}
               text="Puntaje"
               style="items-center gap-2 font-kanit font-thin text-2xl text-white"
            />
         </section>
      </header>
   );
};
