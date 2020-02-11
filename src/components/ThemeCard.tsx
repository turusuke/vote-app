import {
  useFirebase,
  useFirestore,
  useFirestoreConnect
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../ducks/reducers";
import React, { FC } from "react";

interface Props {
  uid: string;
  id: string;
  title: string;
  likes: number;
  isLiked: boolean;
  comment: string;
}

const onClick = ({
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

export const ThemeCard: FC<Props> = ({
  uid,
  id,
  title,
  likes,
  isLiked,
  comment
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  useFirestoreConnect([{ collection: "themes" }]);
  const themes = useSelector(
    ({
      firestore: {
        ordered: { themes }
      }
    }: RootState) => themes
  );

  if (!themes) return null;

  return (
    <Root>
      <div>
        <a href={`#${id}`}>{title}</a>
        <div>
          like: {likes}
          <button
            type="button"
            onClick={() => onClick({ firestore, id, isLiked, uid })}
          >
            💛
          </button>
        </div>
      </div>
      <div>
        <p>{comment}</p>
      </div>
    </Root>
  );
};

const Root = styled.div`
  border: 1px solid;
`;
