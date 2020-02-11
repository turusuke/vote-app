import styled from "styled-components";
import React, { FC } from "react";
import { User } from "../ducks/reducers";

interface Props {
  id: string;
  title: string;
  likes: number;
  onLike: () => void;
  onDelete: () => Promise<void>;
  comment: string;
  user: User;
  isMyTheme: boolean
}

export const ThemeCard: FC<Props> = ({
  id,
  title,
  likes,
  onLike,
  onDelete,
  comment,
  user,
  isMyTheme
}) => {
  return (
    <Root>
      <div>
        <a href={`#${id}`}>{title}</a>
        <div>
          like: {likes}
          <button type="button" onClick={onLike}>
            💛
          </button>
        </div>

        <div>
          <div>{user.displayName}</div>
          <div>
            {user.photoURL && (
              <img width={50} height={50} src={user.photoURL} alt="" />
            )}
          </div>
        </div>

        <div>
          {isMyTheme && <button onClick={onDelete}>削除</button>}
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
