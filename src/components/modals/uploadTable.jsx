import React from "react";

import { Input } from "../common/input";
import { Button } from "../common/button";
import { DoubleText } from "../common/texts";

import { TableRow } from "../../containers/tableSections";
import { ModalHeader } from "./modalHeader";
import { FaFileUpload } from "react-icons/fa";

import { useUploadFile } from "../../hooks/useUploadFile";

// TODO:
//   - refactoring the code, modularizing it

export const UploadTable = ({ modalRef, close }) => {
  const {
    setCurrentSheet,
    uploadFileHandler,
    currentWorkSheet,
    sheetNames,
    workSheets,
  } = useUploadFile();

  return (
    <div
      ref={modalRef}
      className="uploadTable absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur"
    >
      <section className="flex flex-col gap-5 w-4/5 h-4/5 p-5 rounded-lg border border-gray-500 bg-white">
        <ModalHeader text="Subir tabla" click={close} />
        <form className="flex flex-col flex-grow gap-5 w-full overflow-auto">
          <section className="flex gap-5 w-full min-h-20">
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
              styleInput="h-full bg-transparent"
              styleContainer="h-full py-1 border-b-2 outline-none border-gray-600"
            />
          </section>

          <section className="flex flex-col flex-grow gap-2 overflow-auto">
            <table className="flex flex-col flex-grow gap-2 p-2 w-full overflow-auto  border border-black bg-gray-200">
              {workSheets !== undefined &&
                workSheets[currentWorkSheet]?.map((index, key) => (
                  <TableRow
                    key={key}
                    style="flex gap-2 w-fit"
                    styleColm="flex items-center justify-center min-w-60 max-w-60 h-14 overflow-hidden text-lg bg-white"
                    cellValues={index}
                  />
                ))}
            </table>
            <div className="flex items-center w-full min-h-16">
              {sheetNames.map((index, key) => (
                <React.Fragment key={key}>
                  <Button
                    text={index}
                    styleButton="flex items-center justify-center flex-grow h-full px-2 text-xl hover:bg-gray-100 active:bg-gray-200"
                    click={(e) => setCurrentSheet(e, index)}
                  />
                  <span className="divis w-0.5 h-full bg-gray-300 last:hidden"></span>
                </React.Fragment>
              ))}
            </div>
          </section>
        </form>
      </section>
    </div>
  );
};

const ContentLabel = () => (
  <div className="flex items-center gap-3 p-2">
    <FaFileUpload className="text-4xl text-gray-600" />
    <DoubleText
      fristText="Arrastra y suelte su archivo"
      secondText=".xlsx, .xlsm, .xlsp y .xls"
      style="flex flex-col items-center text-sm"
      fristTextStyle="text-gray-600 font-medium"
      secondTextStyle="text-gray-400"
    />
  </div>
);
