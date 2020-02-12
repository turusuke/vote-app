import React, { FC, useState } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Badge,
  Card,
  CardActions,
  IconButton,
  CardContent,
  Collapse,
  Typography,
  Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { User } from "../ducks/reducers";

interface Props {
  id: string;
  title: string;
  likes: number;
  onLike: () => void;
  onDelete: () => Promise<void>;
  comment: string;
  user: User;
  isMyTheme: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative"
    },
    cardContent: {
      paddingRight: "30px"
    },
    title: {},
    comment: {
      marginTop: "0.8em",
      whiteSpace: "pre-line"
    },
    expandWrap: {
      position: "absolute",
      top: 0,
      right: 0
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    profile: {
      position: "absolute",
      bottom: "8px",
      right: "8px"
    }
  })
);

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
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box className={classes.root}>
      <Card variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color="textSecondary">
            {title}
          </Typography>

          {comment.length > 0 && (
            <Box className={classes.comment}>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography>{comment}</Typography>
              </Collapse>
            </Box>
          )}
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={onLike} aria-label="このテーマにいいねをする">
            <Badge badgeContent={likes}>
              <FavoriteIcon />
            </Badge>
          </IconButton>
          {isMyTheme && (
            <IconButton onClick={onDelete} aria-label="このテーマを削除する">
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>

      <Box className={classes.profile}>
        {user.displayName ? (
          <Tooltip placement="top" arrow title={user.displayName} aria-label={user.displayName}>
            <Avatar alt={user.displayName} src={user.photoURL} />
          </Tooltip>
        ) : (
          <Avatar alt={user.displayName} src={user.photoURL} />
        )}
      </Box>

      {comment.length > 0 && (
        <Box className={classes.expandWrap}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="コメントを確認する"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
