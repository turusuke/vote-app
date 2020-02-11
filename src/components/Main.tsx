import React, { FormEvent } from "react";
import { ThemeCard } from "./ThemeCard";
import Form from "./Form";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, Themes } from "../ducks/reducers";

const onSubmit = (event: FormEvent) => {
  event.preventDefault();
  const inputs = event.currentTarget.querySelectorAll("[name]");
  const submitValues =
    ([...inputs] as any).reduce(
      (prev: { [index: string]: string }, currentEl: HTMLFormElement) => {
        prev[currentEl.name] = currentEl.value;
        return prev;
      },
      {}
    );

  submitValues.createdtime = new Date();
  submitValues.like = [];

  return submitValues;
};

const Main = () => {
  const firestore = useFirestore();
  useFirestoreConnect([{ collection: "themes" }, { collection: "users" }]);
  const [themes]  = useSelector(
    ({
      firestore: {
        ordered: { themes }
      }
    }: RootState) => [themes]
  );
  const auth = useSelector(({ firebase: { auth, profile } }: RootState) => auth);

  if (!themes) return null;

  return (
    <main>
      <CardList>
        {themes.map(({ id, title, like, comment }: Themes) => {
          return (
            <ThemeCard
              key={id}
              id={id}
              title={title}
              likes={like ? like.length : 0}
              isLiked={like ? like.includes(auth.uid) : false}
              comment={comment}
              uid={auth.uid}
            />
          );
        })}
      </CardList>

      <Form
        onSubmit={event => {
          const result = onSubmit(event);
          result.user = auth.uid;
          firestore.collection("themes").add(result);
        }}
      />
    </main>
  );
};

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 20px;
`;

export default Main;
