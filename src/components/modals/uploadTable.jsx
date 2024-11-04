import React from "react";

import { Input } from "../common/input";
import { Button } from "../common/button";
import { DoubleText, Text } from "../common/texts";

import { TableRow } from "../../containers/tableSections";
import { ModalHeader } from "./modalHeader";
import { FaFileUpload } from "react-icons/fa";

import { FaFileExcel, FaXmark } from "react-icons/fa6";

import { useSelector } from "../../hooks/useSelector";
import { useUploadFile } from "../../hooks/useUploadFile";

import "../../styles/modal.css";

export const UploadTable = ({ modalRef, close }) => {
  const { helper, handlers, values } = useUploadFile();

  const { handler, reference, table } = useSelector(
    values.workSheets[values.currentWorkSheet],
  );

  return (
    <div
      ref={modalRef}
      className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur p-10"
    >
      {values.message?.msg && <AlertMessage />}

      <section
        className={` ${false ? "open" : "close"} flex flex-col gap-5  p-5 rounded-lg border border-gray-500 bg-white`}
      >
        <ModalHeader
          text="Cargador de archivos de Excel"
          styleText="text-2xl"
          click={close}
        />
        <form className="flex flex-col flex-grow gap-5 w-full overflow-auto">
          <section className="flex flex-col gap-5 w-full min-h-16">
            <Input
              id="upload-file"
              type="file"
              label={<ContentLabel />}
              styleInput="hidden"
              styleLabel="flex items-center justify-center w-full h-full"
              styleContainer="w-full rounded-lg border border-gray-400"
              changeInput={(e) => {
                helper.deleteCurrentSheetNames();
                handlers.uploadFile(e);
              }}
            />
            <FileUploadItem
              progress={values.progress}
              fileName={values.currentFileName}
            />
          </section>

          {false && (
            <section className="flex flex-col flex-grow gap-2 overflow-auto">
              <table
                className="relative flex flex-col flex-grow gap-2 p-2 w-full overflow-auto  border border-black bg-gray-200"
                ref={reference.registerNodeTable}
                onClick={handler.clickOnBox}
              >
                {values.workSheets[values.currentWorkSheet]?.map(
                  (index, key) => (
                    <TableRow
                      key={key}
                      idRow={key}
                      cellValues={index}
                      style="flex gap-2 w-fit"
                      styleColm="box-table select-none flex items-center justify-center min-w-52 max-w-52 h-8 overflow-hidden text-lg bg-white"
                    />
                  ),
                )}
              </table>
              <div className="flex items-center w-full min-h-16">
                {values.sheetNames.map((index, key) => (
                  <React.Fragment key={key}>
                    <Button
                      text={index}
                      styleButton="flex items-center justify-center flex-grow h-full px-2 text-xl hover:bg-gray-100 active:bg-gray-200"
                      click={(e) => helper.putCurrentSheet(e, index)}
                    />
                    <span className="divis w-0.5 h-full bg-gray-300 last:hidden"></span>
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}
        </form>
      </section>
    </div>
  );
};

const AlertMessage = () => (
  <section className="absolute h-24 p-2  rounded-lg border-gray-500 bg-white z-50">
    <div className="relative flex  justify-center flex-col w-full h-full">
      <FaXmark
        className="absolute inset-0 text-xl"
        onClick={helper.closeModalMessage}
      />
      {values.message.msg}
    </div>
  </section>
);

const FileUploadItem = ({ progress, fileName }) => (
  <div className="flex items-center gap-2  w-full h-full">
    <FaFileExcel className="text-5xl" />
    <section className="flex flex-col flex-grow gap-1">
      <Text text={fileName} />
      <ProccesBar progress={progress} />
    </section>
  </div>
);

const ProccesBar = ({ progress }) => (
  <section className="flex items-center gap-2">
    <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-300">
      <span
        style={{ width: `${progress}%` }}
        className="transition-all duration-100 w-0 h-full rounded-full bg-blue-400"
      ></span>
    </div>
    <span></span>
    <Text text={`${progress}%`} style="flex justify-center w-12 text-sm" />
  </section>
);

const ContentLabel = () => (
  <div className="flex items-center gap-3 p-2">
    <FaFileUpload className="text-4xl text-gray-600" />
    <DoubleText
      fristText="Subir archivo"
      secondText=".xlsx, .xlsm, .xlsp y .xls"
      style="flex flex-col items-center"
      fristTextStyle="text-gray-600 font-medium text-xl"
      secondTextStyle="text-gray-400 text-sm"
    />
  </div>
);
