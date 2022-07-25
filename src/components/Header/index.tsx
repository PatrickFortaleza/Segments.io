import { useState } from "react";
import HeaderView from "./view";
import { convertToXLSX, convertToCSV } from "../../utility/exportArray";
import { useSelector } from "react-redux";

export default function HeaderController() {
  const [exportAction, setExportAction] = useState("");
  const filteredUsers = useSelector((state: any) => state.users.filteredUsers);

  const downloadXLSX = async () => {
    // await convertToXLSX(filteredUsers, "test");
    await convertToCSV(filteredUsers, "test");
  };

  return (
    <HeaderView downloadXLSX={downloadXLSX} setExportAction={setExportAction} />
  );
}
