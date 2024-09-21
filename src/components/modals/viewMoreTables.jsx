import { Text } from "../common/texts";
import { Button } from "../common/button";

import { FaXmark } from "react-icons/fa6";

export const ViewMoreTables = () => {
   return (
      <div className="absolute inset-0 flex items-center justify-center w-screen h-screen backdrop-blur">
         <section className="modal flex flex-col w-2/3 h-2/3 p-5 rounded border border-gray-500 bg-white">
            <header className="flex items-center justify-between h-10">
               <Text
                  text="Ver mas Tablas"
                  style="text-2xl tracking-widest font-semibold font-grotesk"
               />
               <Button icon={<FaXmark />} styleButton="text-4xl text-gray-600" />
            </header>
            <article className="flex items-center  flex-grow gap-5 ">
               <CardTable title="Mujeres principales" />
               <CardTable title="Hombres principales" />
               <CardTable title="Mujeres Intermedias" />
               <CardTable title="Hombres Intermedios" />
            </article>
         </section>
      </div>
   );
};

const CardTable = ({ title }) => (
   <section className="flex flex-col w-full gap-2">
      <figure className="card-table w-full rounded border border-gray-700"></figure>
      <Text text={title} style="w-full font-grotesk text-center text-xl" />
   </section>
);
