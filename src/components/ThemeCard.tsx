import styled from "styled-components";
import React, { FC } from "react";
import { User } from "../ducks/reducers";

interface Props {
  id: string;
  title: string;
  likes: number;
  onLike: () => void;
  comment: string;
  user: User;
}

export const ThemeCard: FC<Props> = ({
  id,
  title,
  likes,
  onLike,
  comment,
  user
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
