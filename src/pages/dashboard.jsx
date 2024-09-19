import { Input } from "../components/common/input";
import { Select } from "../components/common/select";
import { Button } from "../components/common/button";
import { Text, Title, IconText } from "../components/common/texts";

import { DashboardHeader } from "../containers/dashboardHeader";

import { FaSearch } from "react-icons/fa";

export const DashBoard = () => {
   return (
      <section className="flex flex-col gap-10 w-screen h-screen px-96 bg-gray-50 overflow-y-auto">
         <DashboardHeader />

         <div className="flex flex-col w-full h-screen">
            <header className="flex justify-between items-center w-full ">
               <Select
                  placeholder="Mostrar..."
                  styleContent="w-32 px-2 p-1 border border-gray-400 bg-white"
               />
               <Input
                  button={<FaSearch />}
                  placeholder="Buscar..."
                  styleButton="flex justify-center items-center order-2 h-full w-10 rounded bg-amber-500 text-white"
                  styleContainer="flex items-center gap-2 h-full p-1 pl-2 rounded border border-gray-500 bg-white"
               />
            </header>
         </div>
      </section>
   );
};
