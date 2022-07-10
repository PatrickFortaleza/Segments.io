import { LegacyRef } from "react";
import { SetterGetter } from "../../../models";
import { Icon } from "semantic-ui-react";

export default function EditableLabelView({
  label,
  editingLabel,
  labelRef,
}: {
  label: SetterGetter;
  editingLabel: SetterGetter;
  labelRef: LegacyRef<HTMLInputElement> | undefined;
}) {
  return (
    <div className="editable__label">
      <button onClick={() => editingLabel.setter(!editingLabel.value)}>
        {editingLabel.value ? (
          <Icon name="checkmark" style={{ color: "var(--success-1)" }} />
        ) : (
          <Icon name="edit" />
        )}
      </button>
      <form
        onClick={() => editingLabel.setter(true)}
        onSubmit={(e) => {
          e.preventDefault();
          editingLabel.setter(false);
        }}
      >
        <input
          ref={labelRef}
          type="text"
          value={label.value}
          onChange={(e) => label.setter(e.target.value)}
          className={`${editingLabel.value ? "editing" : ""}`}
          readOnly={editingLabel.value ? false : true}
          disabled={editingLabel.value ? false : true}
        />
      </form>
    </div>
  );
}
