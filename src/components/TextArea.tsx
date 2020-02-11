import React, { FC } from "react";

interface Props {
  placeholder?: string;
  name: string;
}

const TextArea: FC<Props> = ({ placeholder, name }: Props) => {
  return <textarea name={name} placeholder={placeholder} />;
};

export default TextArea;
