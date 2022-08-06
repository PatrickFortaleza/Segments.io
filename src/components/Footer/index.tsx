import React from "react";
import { Icon } from "semantic-ui-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <span>
        <Icon name="github" /> View Code
      </span>
      <span>&copy; {year} Patrick Fortaleza, demonstrative use only.</span>
    </footer>
  );
}
