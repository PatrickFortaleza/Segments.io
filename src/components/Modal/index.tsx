import { useEffect, useState } from "react";
import { SetterGetter } from "../../models";
import { Icon, SemanticICONS } from "semantic-ui-react";

export default function Modal({
  enable,
  title,
  badge,
  children,
}: {
  enable: SetterGetter;
  title: string;
  badge: SemanticICONS | undefined;
  children: JSX.Element;
}) {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <div className={`modal ${transition ? "active" : "inactive"}`}>
      <div className="modal__content">
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
          className="secondary"
          onClick={() => {
            setTransition(false);
            setTimeout(() => {
              enable.setter(false);
            }, 500);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
