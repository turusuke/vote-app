import React, { FormEvent, useState } from "react";
import {
  useFirestore,
  useFirestoreConnect,
  useFirebase
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import {
  Fab,
  Grid,
  Modal,
  Paper,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Star from "@material-ui/icons/Star";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { RootState, Themes } from "../ducks/reducers";
import useKeyPress from "../hooks/useKeyPress";
import { ThemeCard } from "./ThemeCard";
import ConfirmDialog from "./ConfirmDialog";
import Form from "./Form";
import { compareLikesSize } from "../utils/compareLikesSize";

const Main = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [isKeyPress, setKeyPressed] = useKeyPress();
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectItem, setSelectItem] = useState("");
  const [isOpenConfirmDialog, setOpenConfirmDialog] = React.useState(false);

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
    <Container className={classes.root}>
      <AppBar position="absolute">
        <Toolbar className={classes.menuBar}>
          <Button
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {});
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Paper className={classes.headContent}>
          <Typography variant="body1">
            <Star /> を押すとそのテーマにいいねを送れます。
          </Typography>
          <Typography variant="body1">
            右下の + ボタンか <kbd>⌘ + Return</kbd>で表示される入力フォームからトークテーマを投稿できます。
          </Typography>
        </Paper>
        <Grid container justify="center" spacing={3}>
          <Grid container item xs={12} spacing={3}>
            {themes
              .sort(compareLikesSize)
              .map(({ id, title, like, comment, user }: Themes) => {
                const isLiked = like ? like.includes(auth.uid) : false;
                return (
                  <Grid key={id} item sm={4} xs={12}>
                    <ThemeCard
                      title={title}
                      likes={like ? like.length : 0}
                      isLiked={isLiked}
                      onLike={() =>
                        onLike({ firestore, isLiked, id, uid: auth.uid })
                      }
                      onDelete={() => {
                        setSelectItem(id);
                        setOpenConfirmDialog(true);
                      }}
                      comment={comment}
                      user={user}
                      isMyTheme={user.uid === auth.uid}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>

        <Modal
          onClose={() => {
            setOpenModal(false);
            setKeyPressed(false);
          }}
          open={isOpenModal || (isKeyPress as boolean)}
        >
          <Paper className={classes.formPaper} elevation={3}>
            <Form
              handleCancel={() => {
                setOpenModal(false);
                setKeyPressed(false);
              }}
              onSubmit={event => {
                const themeData = onSubmit(event);
                themeData.user = {
                  uid: auth.uid,
                  displayName: auth.displayName,
                  photoURL: auth.photoURL
                };
                firestore
                  .collection("themes")
                  .add(themeData)
                  .then(() => {
                    setOpenModal(false);
                  });
              }}
            />
          </Paper>
        </Modal>

        <ConfirmDialog
          isOpen={isOpenConfirmDialog}
          handleClose={() => setOpenConfirmDialog(false)}
          handleDelete={() => handleDelete({ id: selectItem, firestore })}
        />

        <Fab
          onClick={() => setOpenModal(true)}
          className={classes.modalFab}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </main>
    </Container>
  );
};

/**
 * サブミット時の処理
 * @param event
 */
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

/**
 * いいねしたときの処理
 * @param firestore
 * @param id
 * @param isLiked
 * @param uid
 */
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

/**
 * 削除したときの処理
 * @param firestore
 * @param id
 */
const handleDelete = ({ firestore, id }: { firestore: any; id: string }) => {
  return firestore
    .collection("themes")
    .doc(id)
    .delete()
    .then(() => {});
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: "2em",
      marginTop: "4.8em"
    },
    headContent: {
      padding: "1.4em 1.2em",
      marginBottom: "1.2em"
    },
    menuBar: {
      justifyContent: "flex-end"
    },
    formPaper: {
      margin: "9vh 4vw",
      padding: "2vh 2vw",

      [theme.breakpoints.down("sm")]: {
        margin: "4vh 2vw"
      }
    },
    modalFab: {
      position: "fixed",
      bottom: "50px",
      right: "50px",

      [theme.breakpoints.down("xs")]: {
        bottom: "10px",
        right: "10px"
      }
    }
  })
);

export default Main;
