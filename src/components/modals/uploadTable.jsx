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
      {values.message?.err && <AlertMessage />}

      <section
        className={`${values.isFileLoaded ? "open" : "close"} flex flex-col gap-5  p-5 rounded-lg border border-gray-500 bg-white`}
      >
        <ModalHeader
          text="Cargador de archivos de Excel"
          styleText={`${values.isFileLoaded ? "text-4xl" : "text-xl"}`}
          click={close}
        />
        <form className="flex flex-col flex-grow gap-5 w-full overflow-auto">
          {!values.isFileLoaded && (
            <FileUpload helper={helper} handler={handlers} values={values} />
          )}

          {values.isFileLoaded && (
            <FileOptions
              values={values}
              reference={reference}
              handler={handler}
              helper={helper}
            />
          )}
        </form>
      </section>
    </div>
  );
};

// pasar los siguientes 2 componentes a otra carpeta

const FileUpload = ({ values, helper, handler }) => {
  return (
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
          handler.uploadFile(e);
        }}
      />
      <FileUploadItem
        progress={values.progress}
        fileName={values.currentFileName}
      />
    </section>
  );
};

const FileOptions = ({ values, reference, handler, helper }) => {
  return (
    <section className="flex flex-col flex-grow gap-2 overflow-auto">
      <nav className="flex items-center w-full min-h-16">
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
      </nav>

      <table
        ref={reference.registerNodeTable}
        className="relative  flex flex-col flex-grow w-full overflow-auto  border border-gray-900"
        onClick={handler.clickOnBox}
      >
        {values.workSheets[values.currentWorkSheet]?.map((index, key) => (
          <TableRow
            key={key}
            idRow={key}
            cellValues={index}
            style="flex w-fit border-b border-gray-900 "
            styleColm="last:border-r-0 border-r border-gray-900 box-table select-none flex items-center justify-center  w-96 h-12 overflow-hidden text-lg bg-white"
          />
        ))}
      </table>

      <div className="flex items-center gap-2 w-full h-20 ">
        <input
          type="text"
          placeholder="Ingresar nombre de la tabla..."
          className="flex-grow h-full p-2 rounded-lg border border-gray-500 bg-transparent placeholder:text-xl placeholder:font-medium"
        />
        <Button
          text="Borrar Tabla actual"
          styleButton="font-semibold items-center w-fit h-full px-3 text-xl text-white rounded-lg bg-red-400"
        />
        <Button
          text="Subir tabla"
          styleButton="font-semibold items-center w-fit h-full px-3 text-xl text-white rounded-lg bg-gray-800"
        />
      </div>
    </section>
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
