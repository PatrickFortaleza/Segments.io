import { Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { denormalize } from "../../redux/actions/entity";

export default function HeaderView() {
  const dispatch = useDispatch();
  const hasUpdated = useSelector((state: any) => state.entities.hasUpdated);
  return (
    <header className="main">
      <div className="main__wrap">
        <div></div>
        <div className="main__actions">
          <button className="default" onClick={() => dispatch(denormalize())}>
            <Icon name="sliders horizontal" />
            Apply Rules
            {hasUpdated && <div className="ind" />}
          </button>
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
