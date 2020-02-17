import { Themes } from "../ducks/reducers";

export function compareLikesSize(a: Themes, b: Themes) {
  if (a.like.length < b.like.length) {
    return 1;
  }

  if (a.like.length > b.like.length) {
    return -1;
  }

  return 0;
}
