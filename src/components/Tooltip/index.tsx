import { Icon, SemanticICONS } from "semantic-ui-react";

interface tipTypes {
  warning: string;
  danger: string;
  info: string;
}

export default function Tooltip({
  message,
  variant,
  minWidth,
}: {
  message: string;
  variant: keyof tipTypes;
  minWidth: number | undefined;
}) {
  let color: string = "",
    icon: SemanticICONS | undefined = undefined;

  switch (variant) {
    case "warning":
      color = "var(--warning-1)";
      icon = "warning sign";
      break;
    case "danger":
      color = "var(--danger-1)";
      icon = "ban";
      break;
    case "info":
      color = "var(--info-1)";
      icon = "info circle";
      break;
    default:
      color = "var(--elevation-0)";
      icon = "info circle";
      break;
  }

  return (
    <button className="tooltip" tabIndex={0}>
      <Icon name={icon} style={{ color: `${color}` }} />
      <span
        className="tooltip__container"
        style={minWidth ? { minWidth: minWidth } : {}}
      >
        <span className="tooltip__content">{message}</span>
      </span>
    </button>
  );
}
