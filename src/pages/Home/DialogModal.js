
import React, { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from '@mui/material/TextField';
import { useCounterStore } from '../../utils/store'
import { useNavigate, useParams } from "react-router-dom";
import cancelImage from '../../assets/image/cancel.png'

function DialogModal(props) {
  const [open, setOpen] = React.useState(false);
  const [row, setRows] = React.useState(0);
  const [names, setNames] = React.useState([])
  const [count, setCount] = useCounterStore();
  const navigate = useNavigate();


  const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit / 2,
      top: theme.spacing.unit / 2,
      color: theme.palette.grey[500],
    },
  })

  const keyDown = (e) => {
    if (e.key == 'Enter') {
      const temp = row + 1
      setRows(temp)
    }
  }

  const change = (e) => {
    setNames(e.target.value.split("\n"))
  }

  const BulkSearch = () => {
    let array = names.filter((item) => item != "")
    setCount({ ...count, names: array, cart: [] })
  }

  useEffect(() => {
    setOpen(props.open)
  }, [props])

  useEffect(() => {
    if (names.length > 0)
      navigate('/search-result')
  }, [count])

  return (
    <Dialog
      open={open}
      color="primary"
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiPaper-root": {
          width: '80%',
          maxWidth: '579px',
          color: "white",
          background: "#353535",
          borderRadius: "20px"
        },
        ".MuiDialogContentText-root": {
          color: "white",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontWeight: '600',
          fontSize: '28px',
          lineHeight: '39px'
        }}>
        {"Advanced Search"}
      </DialogTitle>

      <img src={cancelImage} style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        right: '30px',
        top: '18px',
        cursor: 'pointer'
      }}
        onClick={props.handleClose}
      />

      <DialogContent
        sx={{
          paddingBottom: '12px'
        }}
      >
        <DialogContentText
          id="alert-dialog-description"
        >
          search from 1 up to 1000 at once
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter names to search"
          type="email"
          fullWidth
          variant="standard"
          multiline
          rows={10}
          onKeyDown={keyDown}
          onChange={change}
          className='advanced-search-field'
        />
      </DialogContent>
      <DialogActions>
        <Button
          position={"absolute"}
          sx={{
            background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
            width: '100px',
            height: '31px',
            marginRight: '28px',
            textTransform: 'capitalize',
            color: 'white',
            borderRadius: '12px',
          }} onClick={BulkSearch}>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogModal