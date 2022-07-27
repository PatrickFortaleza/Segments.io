import { Icon } from "semantic-ui-react";

export default function Tooltip({ message }: { message: string }) {
  return (
    <button className="tooltip" tabIndex={0}>
      <Icon name="info circle" />
      <span className="tooltip__container">
        <span className="tooltip__content">{message}</span>
      </span>
    </button>
  );
}
