import { Input } from "../common/input";

import { ModalHeader } from "./modalHeader";

export const EditRow = () => {
   return (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur">
         <section className="modal flex flex-col w-3/4 h-2/6 p-3 rounded-lg border border-gray-500 bg-white">
            <ModalHeader text="Editar fila de la tabla" />
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
