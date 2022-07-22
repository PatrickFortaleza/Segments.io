import { Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderView() {
  const dispatch = useDispatch();
  const hasUpdated = useSelector((state: any) => state.entities.hasUpdated);
  return (
    <header className="main">
      <div className="main__wrap">
        <div></div>
        <div className="main__actions">
          <button className="default">
            <Icon name="save" /> Save
          </button>
          <button className="default">
            <Icon name="download" />
            Download
          </button>
        </div>
      </div>
    </header>
  );
}
