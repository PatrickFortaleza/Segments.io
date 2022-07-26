import { useState, useEffect } from "react";
import HeaderView from "./view";
import {
  convertToXLSX,
  convertToCSV,
  convertToJSON,
} from "../../utility/exportArray";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { saveState } from "../../redux/browser-storage";

export default function HeaderController() {
  const [exportAction, setExportAction] = useState("");
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const filteredUsers = useSelector((state: any) => state.users.filteredUsers);

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
          await convertToXLSX(filteredUsers, "test");
          break;
        case "CSV":
          await convertToCSV(filteredUsers, "test");
          break;
        case "JSON":
          await convertToJSON(filteredUsers, "test");
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
