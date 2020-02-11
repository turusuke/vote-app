import React, { FC } from "react";

interface Props {
  placeholder?: string;
  required?: boolean;
  name: string;
}

const TextArea: FC<Props> = ({ placeholder, name, required }: Props) => {
  return <textarea name={name} placeholder={placeholder} required={required} />;
};

export default TextArea;
