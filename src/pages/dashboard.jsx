import { Input } from "../components/common/input";
import { Select } from "../components/common/select";

import { TableHeader } from "../components/table/header";
import { DashboardHeader } from "../containers/dashboardHeader";

import { FaSearch } from "react-icons/fa";

import "../styles/table.css";

export const DashBoard = () => {
   return (
      <section className="flex flex-col gap-10 w-screen h-screen px-96 bg-gray-50 overflow-y-auto">
         <DashboardHeader />

         <div className="flex flex-col gap-8 w-full h-screen">
            <header className="flex justify-between items-center w-full pb-5 border-b border-gray-200">
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

            <table className="flex content-start w-full flex-grow">
               <TableHeader />
            </table>
         </div>
      </section>
   );
};
