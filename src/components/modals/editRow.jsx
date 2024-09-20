import { Text } from "../common/texts";
import { Input } from "../common/input";
import { Button } from "../common/button";

import { FaXmark } from "react-icons/fa6";

export const EditRow = () => {
   return (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur">
         <section className="modal flex flex-col w-3/4 h-2/6 p-3 rounded-lg border border-gray-500 bg-white">
            <header className="flex items-center justify-between h-10">
               <Text
                  text="Editar fila de la tabla"
                  style="text-2xl tracking-widest font-semibold font-grotesk"
               />
               <Button icon={<FaXmark />} styleButton="text-4xl text-gray-600" />
            </header>
            <form className="flex flex-grow items-center gap-5 pb-10">
               {/* while I make it dynamic for each row of the tables */}
               <Input
                  styleContainer="w-full "
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
               <Input
                  styleContainer="w-full"
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
               <Input
                  styleContainer="w-full"
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
               <Input
                  styleContainer="w-full"
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
               <Input
                  styleContainer="w-full"
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
               <Input
                  styleContainer="w-full"
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
               <Input
                  styleContainer="w-full"
                  styleInput="w-full h-10 px-2 rounded border border-blue-400"
               />
            </form>
         </section>
      </div>
   );
};
