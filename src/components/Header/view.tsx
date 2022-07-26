import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../models";
import BaseSelect from "../FormComponents/BaseSelect";

export default function HeaderView({
  exportAction,
  options,
  validSegment,
}: {
  exportAction: SetterGetter;
  options: Array<string>;
  validSegment: boolean;
}) {
  return (
    <header className="main">
      <div className="main__wrap">
        <div></div>
        <div className="main__actions">
          <button className="default">
            <Icon name="save" /> Save
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
