import { useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import { Tooltip } from "@material-ui/core";
import MuiDialogContentText from "@material-ui/core/DialogContentText";
import Snackbar from "@material-ui/core/Snackbar";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(5)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))(MuiDialogContent);

const DialogContentText = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))(MuiDialogContentText);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export function VoiceRecoderModal(props: any) {
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listeningText, setListeningText] = useState("");
  const [voiceResultText, setVoiceResultText] = useState("");

  const handleClose = () => {
    setListeningText("Press mic button to start recording");
    props.onClose(transcript);
    resetTranscript();
  };
  useEffect(() => {
    setOpen(props.open);
    setListeningText("Press mic button to start recording");
    setVoiceResultText("");
  }, [props.open]);

  const handleVoiceToText = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setOpenSnackBar(true);
      return;
    }
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true
    });
    setListeningText("Recording ... ");
  };

  const handleVoiceStop = () => {
    SpeechRecognition.stopListening();
    setListeningText("");
    setVoiceResultText(
      "Voice recorded. Kindly close the dialog to upate the text in the editor"
    );
  };

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleCloseSnackBar}
        message="Browser not supported"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      <Dialog
        onClose={handleClose}
        aria-labelledby="voice-recorder-dialog"
        open={open}
      >
        <DialogTitle id="voice-recorder-dialog-title" onClose={handleClose}>
          <Typography variant="h6">Convert your speech to text</Typography>
          <Typography variant="caption">
            * Only Chrome and Edge browsers are supported.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <Tooltip title="Start speaking" aria-label="start">
              <IconButton
                color="inherit"
                size="medium"
                onClick={handleVoiceToText}
              >
                <MicIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Stop" aria-label="stop">
              <IconButton
                color="inherit"
                size="medium"
                onClick={handleVoiceStop}
              >
                <StopIcon />
              </IconButton>
            </Tooltip>
          </div>
        </DialogContent>
        <DialogContentText>
          {listeningText}
          {voiceResultText}
        </DialogContentText>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
