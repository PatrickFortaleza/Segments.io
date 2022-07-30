import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../models";
import BaseSelect from "../FormComponents/BaseSelect";
import { useDispatch } from "react-redux";
import { updatePendingSave } from "../../redux/actions/entity";

export default function HeaderView({
  saveStore,
  saveSuccessful,
  exportAction,
  options,
  validSegment,
  pendingSave,
}: {
  saveStore: () => any;
  saveSuccessful: boolean;
  exportAction: SetterGetter;
  options: Array<string>;
  validSegment: boolean;
  pendingSave: boolean;
}) {
  const dispatch = useDispatch();
  return (
    <header className="main">
      <div className="main__head">
        <div className="main__head__left">
          <span className="logo">
            <span className="logo__mark">
              <img src="/assets/images/segments-logo.svg" alt="logo" />
            </span>
            Segments.io
          </span>
          <button className="default">
            <Icon name="question circle outline" />
          </button>
        </div>

        <div className="main__head__right">
          <button
            className="default"
            onClick={() => {
              saveStore();
              dispatch(updatePendingSave({ bool: false }));
            }}
          >
            {saveSuccessful ? (
              <>
                <Icon name="check" style={{ color: "mediumseagreen" }} /> Saved!
              </>
            ) : (
              <>
                <Icon name="save" /> Save{" "}
              </>
            )}
            {pendingSave && <div className="ind" />}
          </button>
          <BaseSelect
            selected={exportAction}
            options={options}
            placeholder={"Export Segment"}
            disabled={!validSegment}
          />
          <span className="user">
            <Icon name="user circle" /> <span>Guest</span>
          </span>
        </div>
      </div>
    </header>
  );
}
