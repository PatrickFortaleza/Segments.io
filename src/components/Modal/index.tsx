import { useEffect, useState } from "react";
import { SetterGetter } from "../../models";

export default function Modal({
  enable,
  title,
  content,
}: {
  enable: SetterGetter;
  title: string;
  content: string;
}) {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <div className={`modal ${transition ? "active" : "inactive"}`}>
      <div className="modal__content">
        <div className="modal__logo">
          <img src="/assets/images/segments-logo.svg" alt="logo" />
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
        <button
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
