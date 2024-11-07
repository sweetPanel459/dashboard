import { useState } from "react";
import { read, utils } from "xlsx";

export const useUploadFile = () => {
  const [message, setMessage] = useState("");
  const [progress, setProgess] = useState(0);
  const [currentFileName, setCurrentFileName] = useState("");

  const [workSheets, setWorkSheets] = useState({});
  const [sheetNames, setSheetNames] = useState([]);
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [currentWorkSheet, setCurrentWorkSheet] = useState(undefined);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const regex = /\.(xlsx|xlsm|xlsp|xls)$/i;

    if (regex.test(fileName)) {
      const fileBase64 = await ReadFileAsDataUrl(file, (e) => setProgess(e));
      const workbook = read(fileBase64.file, { type: "base64" });

      const worksheet = {};

      setCurrentFileName(fileName);
      setIsFileLoaded(fileBase64.fileLoad);

      workbook.SheetNames.forEach((sheetName) => {
        const addSheet = addWorkSheet(workbook, sheetName);

        worksheet[sheetName] = addSheet.sheetData;
        setSheetNames((prev) => [...prev, sheetName]);
      });

      setWorkSheets(worksheet);
    } else {
      setMessage({ err: "Formato del archivo no valido" });
    }
  };

  const putCurrentSheet = (e, index) => {
    e.preventDefault();
    setCurrentWorkSheet(index);
  };

  const deleteCurrentSheetNames = () => {
    if (sheetNames.length >= 0) setSheetNames([]);
  };

  const closeModalMessage = () => setMessage("");

  return {
    handlers: { uploadFile },
    helper: { putCurrentSheet, deleteCurrentSheetNames, closeModalMessage },
    values: {
      workSheets,
      sheetNames,
      message,
      progress,
      isFileLoaded,
      currentFileName,
      currentWorkSheet,
    },
  };
};

const addWorkSheet = (workbook, sheetName) => {
  const sheet = workbook.Sheets[sheetName];
  const range = utils.decode_range(sheet["!ref"]); // Obtener el rango completo del excel

  const sheetData = [];

  for (let row = range.s.r; row <= range.e.r; row++) {
    const rowData = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = utils.encode_cell({ r: row, c: col });
      const cell = sheet[cellAddress];

      rowData.push(cell ? cell.v : null);
    }
    sheetData.push(rowData);
  }

  return { sheetData };
};

const ReadFileAsDataUrl = (file, progress) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onprogress = (e) => {
      const progressLoad = Math.round((e.loaded / file.size) * 100);

      progress(progressLoad);
    };

    reader.onload = (event) => {
      res({ file: event.target.result.split(",")[1], fileLoad: true });
    };

    reader.onerror = (error) => {
      rej(new Error({ msg: "No se pudo cargar el archivo", err: error }));
    };

    reader.readAsDataURL(file);
  });
};
