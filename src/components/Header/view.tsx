import { Icon } from "semantic-ui-react";

export default function HeaderView({
  downloadXLSX,
}: {
  downloadXLSX: () => Promise<void>;
}) {
  return (
    <header className="main">
      <div className="main__wrap">
        <div></div>
        <div className="main__actions">
          <button className="default">
            <Icon name="save" /> Save
          </button>
          <button className="default" onClick={() => downloadXLSX()}>
            <Icon name="download" />
            Download
          </button>
        </div>
      </div>
    </header>
  );
}
