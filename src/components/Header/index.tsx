import HeaderView from "./view";
import { convertToXLSX, convertToCSV } from "../../utility/exportArray";
import { useSelector } from "react-redux";

export default function HeaderController() {
  const filteredUsers = useSelector((state: any) => state.users.filteredUsers);

  const downloadXLSX = async () => {
    // await convertToXLSX(filteredUsers, "test");
    await convertToCSV(filteredUsers, "test");
  };

  return <HeaderView downloadXLSX={downloadXLSX} />;
}
