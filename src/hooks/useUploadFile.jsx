import { read, utils } from "xlsx";
import { useState, useEffect } from "react";

const ReadFileAsDataUrl = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      res(e.target.result.split(",")[1]);
    };

    reader.onerror = (error) => {
      rej(new Error({ msg: "no se pudo cargar el archivo", err: error }));
    };

    reader.readAsDataURL(file);
  });
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

export const useUploadFile = () => {
  const [workSheets, setWorkSheets] = useState({});
  const [sheetNames, setSheetNames] = useState([]);
  const [currentWorkSheet, setCurrentWorkSheet] = useState(undefined);

  useEffect(() => {}, [workSheets]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const fileBase64 = await ReadFileAsDataUrl(file);
    const workbook = read(fileBase64, { type: "base64" });

    const worksheet = {};

    workbook.SheetNames.forEach((sheetName) => {
      const addSheet = addWorkSheet(workbook, sheetName);

      worksheet[sheetName] = addSheet.sheetData;
      setSheetNames((prev) => [...prev, sheetName]);
    });

    setWorkSheets(worksheet);
  };

  const putCurrentSheet = (e, index) => {
    e.preventDefault();
    setCurrentWorkSheet(index);
  };

  const deleteCurrentSheetNames = () => setSheetNames([]);

  return {
    deleteCurrentSheetNames,
    putCurrentSheet,
    uploadFileHandler,
    currentWorkSheet,
    workSheets,
    sheetNames,
  };
};
