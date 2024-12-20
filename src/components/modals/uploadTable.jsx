import React from "react";

import { Input } from "../common/input";
import { Button } from "../common/button";
import { DropdownOptions } from "../common/dropdown";
import { DoubleText, Text } from "../common/texts";

import { TableRow } from "../../containers/tableSections";
import { ModalHeader } from "./modalHeader";
import { FaFileUpload } from "react-icons/fa";

import { FaFileExcel, FaXmark } from "react-icons/fa6";

import { useSelector } from "../../hooks/useSelector";
import { useUploadFile } from "../../hooks/useUploadFile";

import "../../styles/modal.css";

// TODO :
// - ui para la el registro de admin
//    1. crear el modal contendor
//    3. hacer 2 pasos para la confirm
//    2. tendra 3 inputs, name, gmail y el token enviado
//    4. hacer un componente para el header que sea un dropdown que contenga opciones sobre el usuario
// - logica para el registro de admin
//    1. confimar si el nombre si esta registrado
//    2. con una exprecion regular confirmar en el front y en el backend si el gmail es correcto
//    3. si es correcto registrarlo
//    4. apenas se registre guardarlo en el localstorage su registro y permanecerlo abierto mientras no lo cierre manualmente
// - custom hook para la preparcion del envio de la tabla
//    1. armar la estructura del hook
//    2. mediante el evento submit confirmar si todas las filas tengan la misma cantidad de indices
//    3. obtener el parametro de url para el user id
//

export const UploadTable = ({ modalRef, close }) => {
  const { helper, handlers, values } = useUploadFile();

  const { handler, reference, table } = useSelector(
    values.workSheets[values.currentWorkSheet],
  );

  return (
    <div
      ref={modalRef}
      className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur p-3"
    >
      {values.message?.err && <AlertMessage />}

      <section
        className={`${values.isFileLoaded ? "open" : "close"} flex flex-col gap-5  p-5 rounded-lg border border-gray-500 bg-white`}
      >
        <ModalHeader
          text="Cargador de archivos de Excel"
          styleText={`${values.isFileLoaded ? "text-4xl" : "text-2xl"}`}
          click={close}
        />
        <form className="nose flex flex-col flex-grow gap-5 w-full overflow-auto">
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
    <section className="flex flex-col gap-5 w-full h-96">
      <Input
        id="upload-file"
        type="file"
        label={<ContentLabel />}
        styleInput="hidden"
        styleLabel="flex items-center justify-center w-full h-full"
        styleContainer="w-full h-full rounded-lg border border-gray-400"
        changeInput={(e) => {
          helper.deleteCurrentSheetNames();
          handler.uploadFile(e);
        }}
      />
      {values.currenFileName && (
        <FileUploadItem
          progress={values.progress}
          fileName={values.currentFileName}
        />
      )}
    </section>
  );
};

const FileOptions = ({ values, reference, handler, helper }) => {
  return (
    <section className=" flex flex-col flex-grow gap-2 overflow-hidden ">
      <table
        ref={reference.registerNodeTable}
        className="flex flex-col flex-grow w-full overflow-auto  border border-gray-900"
        onClick={handler.clickOnBox}
      >
        {values.workSheets[values.currentWorkSheet]?.map((index, key) => (
          <TableRow
            key={key}
            idRow={key}
            cellValues={index}
            style="flex w-fit border-b border-gray-900"
            styleColm=" border-r border-gray-900 box-table select-none flex items-center justify-center  w-52 h-10 text-sm bg-white"
          />
        ))}
      </table>

      <nav className="flex items-center gap-2 w-full min-h-10 max-h-10">
        <input
          type="text"
          placeholder="Ingresar nombre de la tabla..."
          className="flex-grow h-full p-2 rounded-lg border border-gray-500 bg-transparent placeholder:text-xl placeholder:font-medium"
        />
        <DropdownOptions
          defaultValue="Nose"
          styleContainer="h-full "
          styleList="border-blue-400"
          styleHeader="border-blue-400 h-full rounded-lg"
          option={values.sheetNames}
          buttonClick={(e, index) => {
            helper.putCurrentSheet(e, index);
          }}
        />
        <Button
          text="Borrar Tabla actual"
          styleButton="font-semibold items-center w-fit h-full px-3 text-xl text-white rounded-lg bg-red-400"
        />
        <Button
          text="Subir tabla"
          styleButton="font-semibold items-center w-fit h-full px-3 text-xl text-white rounded-lg bg-gray-800"
        />
      </nav>
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
        className="w-0 h-full rounded-full bg-blue-400"
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
