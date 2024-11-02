import React from "react";

import { Input } from "../common/input";
import { Button } from "../common/button";
import { DoubleText } from "../common/texts";

import { TableRow } from "../../containers/tableSections";
import { ModalHeader } from "./modalHeader";
import { FaFileUpload } from "react-icons/fa";

import { useSelector } from "../../hooks/useSelector";
import { useUploadFile } from "../../hooks/useUploadFile";

export const UploadTable = ({ modalRef, close }) => {
  const { helper, handlers, values } = useUploadFile();

  const { handler, reference, table } = useSelector(
    values.workSheets[values.currentWorkSheet],
  );

  return (
    <div
      ref={modalRef}
      className=" absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur p-10"
    >
      <section className="flex flex-col gap-5 w-full h-full  p-5 rounded-lg border border-gray-500 bg-white">
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
              changeInput={(e) => {
                helper.deleteCurrentSheetNames();
                handlers.uploadFile(e);
              }}
            />
            <Input
              type="text"
              placeholder="Nombre de la tabla"
              styleInput="text-xl bg-transparent"
              styleContainer="flex items-end h-full py-1 border-b-2 outline-none border-gray-600"
            />
          </section>

          <section className="flex flex-col flex-grow gap-2 overflow-auto">
            <table
              autoFocus
              className="relative flex flex-col flex-grow gap-2 p-2 w-full overflow-auto  border border-black bg-gray-200"
              ref={reference.registerNodeTable}
              onClick={handler.clickOnBox}
            >
              {values.workSheets[values.currentWorkSheet]?.map((index, key) => (
                <TableRow
                  key={key}
                  idRow={key}
                  cellValues={index}
                  style="flex gap-2 w-fit"
                  styleColm="box-table select-none flex items-center justify-center min-w-52 max-w-52 h-8 overflow-hidden text-lg bg-white"
                />
              ))}
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
