import { useState, useEffect } from "react";
import HeaderView from "./view";
import {
  convertToXLSX,
  convertToCSV,
  convertToJSON,
} from "../../utility/exportArray";
import { sanitizeFileName } from "../../utility";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { saveState } from "../../redux/browser-storage";

export default function HeaderController() {
  const [exportAction, setExportAction] = useState("");
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const filteredUsers = useSelector((state: any) => state.users.filteredUsers);
  const segmentTitle = useSelector((state: any) => state.users.segmentTitle);

  const options = ["XLSX", "CSV", "JSON"];

  const saveStore = () => {
    try {
      saveState(store.getState());
      setSaveSuccessful(true);
      setTimeout(() => {
        setSaveSuccessful(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      switch (exportAction) {
        case "XLSX":
          await convertToXLSX(filteredUsers, sanitizeFileName(segmentTitle));
          break;
        case "CSV":
          await convertToCSV(filteredUsers, sanitizeFileName(segmentTitle));
          break;
        case "JSON":
          await convertToJSON(filteredUsers, sanitizeFileName(segmentTitle));
          break;
        default:
          break;
      }
      setTimeout(() => {
        setExportAction("");
      }, 1000);
    })();
  }, [exportAction]);

  return (
    <HeaderView
      saveStore={saveStore}
      options={options}
      exportAction={{
        setter: setExportAction,
        value: exportAction,
      }}
      saveSuccessful={saveSuccessful}
      validSegment={Array.isArray(filteredUsers) && filteredUsers.length > 0}
    />
  );
}
