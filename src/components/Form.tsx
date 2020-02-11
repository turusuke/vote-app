import React, { FC, FormEvent } from "react";
import TextArea from "./TextArea";

interface Props {
  onSubmit?: (event: FormEvent) => void;
}

const Form: FC<Props> = ({ onSubmit = () => {} }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        お題(必須):
        <TextArea name="title" placeholder="お題どぞ" />
      </label>

      <label>
        コメント:
        <TextArea
          name="comment"
          placeholder="コメントどぞ"
        />
      </label>

      <label>
        匿名で投稿
        <input type="checkbox" name="anonymous"/>
      </label>
      <button>お題を投稿する</button>
    </form>
  );
};

export default Form;
