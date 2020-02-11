import React, { FormEvent } from "react";
import { ThemeCard } from "./ThemeCard";
import Form from "./Form";
import {
  useFirestore,
  useFirestoreConnect,
  useFirebase
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { RootState, Themes } from "../ducks/reducers";

const onSubmit = (event: FormEvent) => {
  event.preventDefault();
  const inputs = event.currentTarget.querySelectorAll("[name]");
  const submitValues = ([...inputs] as any).reduce(
    (prev: { [index: string]: string }, currentEl: HTMLFormElement) => {
      prev[currentEl.name] =
        currentEl.name === "anonymous" ? currentEl.checked : currentEl.value;

      if (currentEl.name !== "anonymous") currentEl.value = "";
      return prev;
    },
    {}
  );

  submitValues.createdtime = new Date();
  submitValues.like = [];

  return submitValues;
};

const onLike = ({
  firestore,
  id,
  isLiked,
  uid
}: {
  firestore: any;
  id: string;
  isLiked: boolean;
  uid: string;
}) => {
  firestore
    .collection("themes")
    .doc(id)
    .update({
      like: isLiked
        ? firestore.FieldValue.arrayRemove(uid)
        : firestore.FieldValue.arrayUnion(uid)
    });
};

const onDelete = ({ firestore, id }: { firestore: any; id: string }) => {
  // TODO: 確認挟む
  return firestore
    .collection("themes")
    .doc(id)
    .delete()
    .then(() => {});
};

const Main = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  useFirestoreConnect([{ collection: "themes" }]);
  const themes = useSelector(
    ({
      firestore: {
        ordered: { themes }
      }
    }: RootState) => {
      return (
        themes &&
        themes.map((theme: Themes) => {
          if (theme.anonymous) {
            Object.assign(theme, {
              user: {
                displayName: null,
                photoURL: null,
                uid: null
              }
            });
          }

          return theme;
        })
      );
    }
  );

  const auth = useSelector(
    ({ firebase: { auth, profile } }: RootState) => auth
  );

  if (!themes) return null;

  return (
    <main>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {themes.map(({ id, title, like, comment, user }: Themes) => {
            const isLiked = like ? like.includes(auth.uid) : false;
            return (
              <ThemeCard
                key={id}
                id={id}
                title={title}
                likes={like ? like.length : 0}
                onLike={() => onLike({ firestore, isLiked, id, uid: auth.uid })}
                onDelete={() => onDelete({ firestore, id })}
                comment={comment}
                user={user}
                isMyTheme={user.uid === auth.uid}
              />
            );
          })}
        </Grid>
      </Grid>
      <Form
        onSubmit={event => {
          const themeData = onSubmit(event);
          themeData.user = {
            uid: auth.uid,
            displayName: auth.displayName,
            photoURL: auth.photoURL
          };
          firestore.collection("themes").add(themeData);
        }}
      />

      <button
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {});
        }}
      >
        ログアウト
      </button>
    </main>
  );
};

export default Main;
