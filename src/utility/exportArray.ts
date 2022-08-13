import { User } from "../models/user";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

export const convertToXLSX = async (array: Array<User>, fileName: string) => {
  let fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;";
  let ws = utils.json_to_sheet(array);
  let wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  let excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
  let data = new Blob([excelBuffer], { type: fileType });
  saveAs(data, fileName);
};

export const convertToCSV = async (array: Array<User>, fileName: string) => {
  let fileType = "text/csv;";
  let headers = Object.keys(array[0]);
  let rows = array.map((row) => [...Object.values(row)]);

  rows.unshift(headers);
  let csv = rows.map((row) => row.join(",")).join("\n");
  let data = new Blob([csv], { type: fileType });
  saveAs(data, fileName);
};

export const convertToJSON = async (array: Array<User>, fileName: string) => {
  let fileType = "application/json;";
  let data = new Blob([JSON.stringify(array)], { type: fileType });
  saveAs(data, fileName);
};
