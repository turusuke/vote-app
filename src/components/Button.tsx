import React, { FC } from "react";

interface Props {
  type: "button" | "submit" | "reset";
  children: string;
  onClick: Function;
}

const Button: FC<Props> = ({ type = "submit", children }) => {
  return <button type={type}>{children}</button>;
};

export default Button;
