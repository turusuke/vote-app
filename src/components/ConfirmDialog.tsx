import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
}

const ConfirmDialog: FC<Props> = ({ isOpen, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        選択した内容を削除します
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          削除した内容は復元できませんがよろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button
          onClick={() => handleDelete().then(() => handleClose())}
          color="primary"
          autoFocus
        >
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
