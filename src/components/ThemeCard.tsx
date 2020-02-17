import React, { FC, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
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
import Star from "@material-ui/icons/Star";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { User } from "../ducks/reducers";

interface Props {
  title: string;
  likes: number;
  isLiked: boolean;
  onLike: () => void;
  onDelete: () => void;
  comment: string;
  user: User;
  isMyTheme: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      display: "flex",
      height: "100%"
    },
    card: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    },
    cardContent: {
      paddingRight: "30px",
      flexGrow: 1
    },
    cardActions: {
      backgroundColor: "#f3f2f2"
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

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      top: "-2px",
      right: "-4px",
      border: "2px solid #fff",
      padding: "0 4px",
      backgroundColor: "#f18211",
      color: "white"
    }
  })
)(Badge);

export const ThemeCard: FC<Props> = ({
  title,
  likes,
  isLiked,
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
      <Card className={classes.card} variant="outlined">
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

        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton onClick={onLike} aria-label="このテーマにいいねをする">
            <StyledBadge badgeContent={likes}>
              <Star
                style={{
                  color: isLiked ? "#f18211" : "currentColor"
                }}
              />
            </StyledBadge>
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
          <Tooltip
            placement="top"
            arrow
            title={user.displayName}
            aria-label={user.displayName}
          >
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
