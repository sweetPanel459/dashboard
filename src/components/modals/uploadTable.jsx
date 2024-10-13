import { read, utils } from "xlsx";

import { Input } from "../common/input";
import { DoubleText } from "../common/texts";

import { TableRow } from "../../containers/tableSections";
import { ModalHeader } from "./modalHeader";

import { FaFileUpload } from "react-icons/fa";

const worksheetExample = [
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    "ID",
    "Producto",
    "Cantidad",
    "Precio",
    null,
    null,
    "ID",
    "Producto",
    "Cantidad",
    "Precio",
    null,
    null,
    "ID",
    "Producto",
    "Cantidad",
    "Precio",
    null,
    null,
  ],
  [
    null,
    1,
    "Manzanas",
    50,
    0.5,
    null,
    null,
    1,
    "Manzanas",
    50,
    0.5,
    null,
    null,
    1,
    "Manzanas",
    50,
    0.5,
    null,
    null,
  ],
  [
    null,
    2,
    "Peras",
    30,
    0.7,
    null,
    null,
    2,
    "Peras",
    30,
    0.7,
    null,
    null,
    2,
    "Peras",
    30,
    0.7,
    null,
    null,
  ],
  [
    null,
    3,
    "Plátanos",
    null,
    0.3,
    null,
    null,
    3,
    "Plátanos",
    null,
    0.3,
    null,
    null,
    3,
    "Plátanos",
    null,
    0.3,
    null,
    null,
  ],
  [
    null,
    4,
    "Naranjas",
    20,
    undefined,
    null,
    null,
    4,
    "Naranjas",
    20,
    undefined,
    null,
    null,
    null,
    4,
    "Naranjas",
    20,
    undefined,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
];

const ReadFileAsDataUrl = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = (e) => res(e.target.result.split(",")[1]);
    reader.onerror = (error) =>
      rej(new Error({ msg: "no se pudo cargar el archivo", err: error }));

    reader.readAsDataURL(file);
  });
};

const uploadFileHandler = async (e) => {
  const file = e.target.files[0];

  const fileBase64 = await ReadFileAsDataUrl(file);
  const workbook = read(fileBase64, { type: "base64" });

  const worksheets = {};

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    worksheets[sheetName] = utils.sheet_to_json(sheet, { header: 1 });
  });

  console.log(worksheets);
};

export const UploadTable = ({ modalRef, close }) => {
  return (
    <div
      ref={modalRef}
      className="uploadTable absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur"
    >
      <section className="flex flex-col gap-5 w-4/5 h-4/5 p-5 rounded-lg border border-gray-500 bg-white">
        <ModalHeader text="Subir tabla" click={close} />
        <form className="flex gap-5 h-full w-full">
          <section className="flex flex-col gap-5 w-1/5 h-full ">
            <Input
              id="upload-file"
              type="file"
              label={<ContentLabel />}
              styleInput="hidden"
              styleLabel="flex items-center justify-center w-full h-full"
              styleContainer="flex-grow w-full rounded-lg border-2 border-dashed border-black"
              changeInput={uploadFileHandler}
            />
            <Input
              type="text"
              placeholder="Nombre de la tabla"
              styleInput="bg-transparent"
              styleContainer="h-fit py-1 border-b-2 outline-none border-gray-600"
            />
          </section>

          <section className="flex flex-grow h-full overflow-auto">
            <table className="w-full h-full border border-gray-400">
              {worksheetExample.map((index, key) => {
                return (
                  <TableRow
                    key={key}
                    style="h-20"
                    styleColm="w-32 pt-2 h-full border border-gray-400"
                    cellValues={index}
                  />
                );
              })}
            </table>
          </section>
        </form>
      </section>
    </div>
  );
};

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
