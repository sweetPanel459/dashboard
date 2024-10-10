import { Input } from "../common/input";
import { DoubleText, Text, Title } from "../common/texts";

import { ModalHeader } from "./modalHeader";

import { FaTableList } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";

const ContentLabel = () => (
  <div className="flex flex-col items-center gap-3">
    <FaFileUpload className="text-6xl text-gray-600" />
    <DoubleText
      fristText="Arrastra y suelte su archivo"
      secondText=".xlsx, .xlsm, .xlsp y .xls"
      style="flex flex-col items-center"
      fristTextStyle="text-gray-600 font-medium"
      secondTextStyle="text-gray-400"
    />
  </div>
);

const TableCardObtained = () => (
  <div className="flex gap-2 p-2 w-full rounded-lg border-2 border-gray-600">
    <FaTableList className="text-2xl" />
    <Text text="Nombre de la tabla" />
  </div>
);

export const UploadTable = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur">
      <section className="modal flex flex-col gap-5 w-3/5 h-2/3 p-5 rounded-lg border border-gray-500 bg-white">
        <ModalHeader text="Subir tabla" />
        <form className="flex flex-grow gap-5 w-full">
          <section className="flex flex-col gap-5 w-full h-full ">
            <Input
              id="upload-file"
              type="file"
              label={<ContentLabel />}
              styleInput="hidden"
              styleLabel="flex items-center justify-center w-full h-full"
              styleContainer="flex-grow w-full rounded-lg border-2 border-dashed border-black"
            />
            <div className="flex justify-between gap-5 w-full h-10">
              <input
                type="text"
                placeholder="Nombre de la tabla"
                className=" flex-grow h-full border-b-2 outline-none border-gray-600"
              />
              <label
                htmlFor="upload-file"
                className="flex items-center justify-center flex-grow h-full rounded-lg  text-lg font-semibold bg-gray-600 text-white"
              >
                Subir archivo
              </label>
            </div>
          </section>

          <section className="flex flex-col gap-4 w-full h-full">
            <Title text="Tablas obtenidas del archivos:" style="text-2xl" />
            <TableCardObtained />
          </section>
        </form>
      </section>
    </div>
  );
};
