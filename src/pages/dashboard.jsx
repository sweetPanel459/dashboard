import { useRef, useEffect } from "react";

import { Input } from "../components/common/input";
import { Select } from "../components/common/select";

import { DashboardHeader } from "../containers/dashboardHeader";
import { TableHeader, TableRow } from "../containers/tableSections";

import { UploadTable } from "../components/modals/uploadTable";

import { EditRow } from "../components/modals/editRow";
import { ViewMoreTables } from "../components/modals/viewMoreTables";

import { FaSearch } from "react-icons/fa";

import { useModalToggle } from "../hooks/useModalToggle";

import "../styles/style.css";

const exampleData = [
  ["TATIANA CAROLINA", 1, 1, 1, 1, 4, 1],
  ["YEIMI ATENCIO", 2, 4, 1, 3, 10, 2],
  ["ALEJANDRA MARTINEZ", 7, 2, 2, 3, 14, 3],
  ["YURANIS PACHECO", 5, 3, 12, 4, 24, 4],
  ["LINA DOVAL", 8, 6, 4, 3, 12, 5],
  ["LINA GARCIA", 6, 10, 5, 5, 26, 6],
  ["JHANA ARROYO", 9, 9, 9, 9, 34, 7],
  ["CRISTINA CARDONA", 12, 11, 10, 5, 38, 8],
  ["GRACE NARANJO", 14, 5, 14, 5, 40, 9],
  ["LORENA FUENTES", 20, 5, 15, 11, 43, 10],
  ["MARIA ALEJANDRA", 15, 14, 7, 11, 47, 11],
  ["LILIANA NEGRETE", 13, 13, 12, 11, 49, 12],
  ["DAYANA ARGEL", 13, 12, 13, 11, 50, 13],
  ["DAYSSI PARRA", 17, 16, 11, 8, 51, 14],
  ["LEIDY SANCHEZ", 4, 17, 16, 15, 52, 15],
  ["WENDY AYAZO", 3, 20, 12, 17, 52, 15],
  ["ISABELLA LOZANO", 21, 12, 17, 16, 59, 17],
  ["DAIRYS FURNIELES", 15, 21, 15, 20, 61, 18],
  ["MARIED BLANQUICET", 15, 21, 18, 16, 73, 19],
  ["DINA TEHERAN", 19, 18, 16, 16, 73, 19],
  ["MARIA FERNANDA COL", 18, 19, 21, 18, 76, 21],
];
/*TODO:
 * - create modal to upload tables - in procces
 * - create the custom hook in charge of the state of the modals (open/close)
 * - create the logic to upload xlsx
 * - create filter logic to accept only tables
 * - make http requests to endpoints
 * - bind components to http requests
 * - create filter logic on tables
 * */

export const DashBoard = () => {
  const modalRef = useRef(null);
  const { stateModal, openModal, closeModal } = useModalToggle(modalRef);

  useEffect(() => { }, [modalRef]);

  return (
    <section
      ref={modalRef}
      className="flex flex-col gap-10 w-screen h-screen px-52 overflow-y-auto bg-gray-100 dark:bg-gray-700 "
    >
      <DashboardHeader
        clickOpenModal={openModal}
        styleHeader="bg-slate-600 dark:bg-slate-800"
      />

      <div className="hola flex flex-col gap-8 pb-10 w-full h-fit">
        <header className="flex justify-between items-center flex-grow mx-3 pb-5 border-b border-gray-300 dark:border-gray-500">
          <Select
            placeholder="Mostrar..."
            styleButton="text-2xl text-slate-500 dark:text-white"
            styleContent="w-32 px-2 p-1 border border-gray-500 bg-white dark:bg-slate-600 dark:text-white"
          />
          <Input
            button={<FaSearch />}
            placeholder="Buscar..."
            styleInput="bg-transparent dark:text-white"
            styleButton="flex justify-center items-center order-2 h-full w-10 rounded bg-slate-500 text-white"
            styleContainer="flex items-center gap-2 h-full p-1 pl-2 rounded border border-gray-500 bg-white dark:bg-slate-600 "
          />
        </header>

        <table className="flex flex-col content-start flex-grow w-full p-3 rounded bg-white dark:bg-transparent">
          <thead className="w-full h-fit pb-2 border-b-2 border-gray-500">
            <TableHeader styleButton="text-salte-400 text-gray-700 dark:text-white" />
          </thead>

          <tbody className="flex flex-col gap-2">
            {exampleData.map((index, key) => (
              <TableRow
                key={key}
                cellValues={index}
                style="border-gray-300 dark:border-gray-500"
                styleColm="text-gray-600 dark:text-gray-200"
              />
            ))}
          </tbody>
        </table>
      </div>
      <EditRow />
      <UploadTable close={closeModal} />
      <ViewMoreTables />
    </section>
  );
};
