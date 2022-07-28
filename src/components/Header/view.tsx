import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../models";
import BaseSelect from "../FormComponents/BaseSelect";

export default function HeaderView({
  saveStore,
  saveSuccessful,
  exportAction,
  options,
  validSegment,
}: {
  saveStore: () => any;
  saveSuccessful: boolean;
  exportAction: SetterGetter;
  options: Array<string>;
  validSegment: boolean;
}) {
  return (
    <header className="main">
      <div className="main__wrap">
        <div className="main__actions">
          <button className="default">
            <Icon name="info circle" />
            App Information
          </button>
        </div>
        <div className="main__actions">
          <button className="default" onClick={() => saveStore()}>
            {saveSuccessful ? (
              <>
                <Icon name="check" style={{ color: "mediumseagreen" }} /> Saved!
              </>
            ) : (
              <>
                <Icon name="save" /> Save{" "}
              </>
            )}
          </button>
          <BaseSelect
            selected={exportAction}
            options={options}
            placeholder={"Export Segment"}
            disabled={!validSegment}
          />
        </div>
      </div>
    </header>
  );
}
