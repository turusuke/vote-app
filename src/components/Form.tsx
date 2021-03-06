import React, { FC, FormEvent } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

interface Props {
  handleCancel: () => void;
  onSubmit?: (event: FormEvent) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      margin: "2em 0 0"
    },

    buttons: {
      maxWidth: "270px",
      margin: "2em 0 0",
      display: "flex",
      justifyContent: "space-between"
    }
  })
);

const Form: FC<Props> = ({ onSubmit = () => {}, handleCancel }: Props) => {
  const classes = useStyles();
  return (
    <form onSubmit={onSubmit}>
      <Box className={classes.box}>
        <TextField
          required
          name="title"
          label="お題"
          multiline
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box className={classes.box}>
        <TextField
          name="comment"
          label="お題に対する想いがあればどうぞ"
          multiline
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box className={classes.box}>
        <FormControlLabel
          control={<Checkbox name="anonymous" />}
          label="匿名で投稿する"
        />
        <Typography>
          ※ 投稿者が非表示になります。
          <br />
          匿名の投稿は自分で削除できないので注意!!
        </Typography>
      </Box>

      <Box className={classes.buttons}>
        <Button type="button" onClick={handleCancel}>
          キャンセルする
        </Button>

        <Button type="submit" variant="contained" color="primary">
          お題を投稿する
        </Button>
      </Box>
    </form>
  );
};

export default Form;
