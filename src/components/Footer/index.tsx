import React from "react";
import { Icon } from "semantic-ui-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <a
        href="https://github.com/PatrickFortaleza/market_segmenter"
        target="blank_"
        rel="noreferrer"
        className="base"
      >
        <Icon name="github" /> View Code
      </a>
      <span>&copy; {year} Patrick Fortaleza, demonstrative use only.</span>
    </footer>
  );
}
