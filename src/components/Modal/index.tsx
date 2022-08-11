import { useEffect, useState } from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";

export default function Modal({
  enable,
  title,
  badge,
  children,
}: {
  enable: {
    setter: ((any: any) => any) | null;
    value: any;
  };
  title: string;
  badge: SemanticICONS | undefined;
  children: JSX.Element;
}) {
  const [transition, setTransition] = useState(false);

  const close = () => {
    if (enable?.setter) {
      setTransition(false);
      setTimeout(() => {
        if (typeof enable.setter === "function") enable.setter(false);
      }, 500);
    }
  };

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <div
      className={`modal ${transition ? "active" : "inactive"}`}
      onClick={() => close()}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {badge && (
          <span className="badge">
            <Icon name={badge} />
          </span>
        )}
        <div className="modal__logo">
          <img src="/assets/images/segments-logo.svg" alt="logo" />
        </div>
        <h3>{title}</h3>
        {children}
        <button
          className={`secondary ${!enable?.setter ? "disabled" : "active"}`}
          onClick={() => close()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
