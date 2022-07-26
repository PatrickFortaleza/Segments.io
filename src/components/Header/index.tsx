import { useState, useEffect } from "react";
import HeaderView from "./view";
import {
  convertToXLSX,
  convertToCSV,
  convertToJSON,
} from "../../utility/exportArray";
import { useSelector } from "react-redux";

export default function HeaderController() {
  const [exportAction, setExportAction] = useState("");
  const filteredUsers = useSelector((state: any) => state.users.filteredUsers);

  const options = ["XLSX", "CSV", "JSON"];

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
      options={options}
      exportAction={{
        setter: setExportAction,
        value: exportAction,
      }}
      validSegment={Array.isArray(filteredUsers) && filteredUsers.length > 0}
    />
  );
}
