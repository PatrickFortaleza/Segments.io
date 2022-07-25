import { Icon } from "semantic-ui-react";
import BaseSelect from "../FormComponents/BaseSelect";

export default function HeaderView({
  setExportAction,
}: {
  setExportAction: (string: string) => Promise<void>;
}) {
  return (
    <header className="main">
      <div className="main__wrap">
        <div></div>
        <div className="main__actions">
          <button className="default">
            <Icon name="save" /> Save
          </button>
          {/* <button className="default" onClick={() => downloadXLSX()}>
            <Icon name="download" />
            Download
          </button> */}
          <BaseSelect
            setter={setExportAction}
            options={["XLSX", "CSV", "JSON"]}
            placeholder={"Export Segment"}
          />
        </div>
      </div>
    </header>
  );
}
