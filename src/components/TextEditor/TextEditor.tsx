import { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Drawer,
  Divider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./constants/";

export function TextEditor(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [textIdArr, setTextIdArr] = useState<string[]>([]);
  const [textContent, setTextContent] = useState("");
  const [textId, setTextId] = useState("");

  useEffect(() => {
    let localKey = localStorage.getItem("TextIds");

    if (localKey == null) {
      const newId = uuidv4();
      textIdArr.push(newId);
      localStorage.setItem("TextIds", JSON.stringify([newId]));
      localStorage.setItem(newId, "");
      setTextId(newId);
      setTextIdArr(textIdArr);
      setTextContent("");
    } else {
      if (textId === "") {
        let textIds = JSON.parse(localStorage.getItem("TextIds") || "{}");
        setTextIdArr(textIds);
        let value = localStorage.getItem(textIds[0])!;
        setTextId(textIdArr[0]);
        setTextContent(value);
      }
    }
  }, [textContent, textId, textContent, textIdArr]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const newId = uuidv4();
    textIdArr.push(newId);
    localStorage.setItem("TextIds", JSON.stringify(textIdArr));
    localStorage.setItem(newId, "");
    setTextIdArr(textIdArr);
    setTextId(newId);
    setTextContent("");
  };

  const handleTextContent = (event: any) => {
    let value = event?.target.value;
    console.log("text id, value", textId, value);
    localStorage.setItem(textId, value);
    setTextContent(value);
  };

  const handleGetContent = (id: any) => {
    const content = localStorage.getItem(id)!;
    console.log("id, content:", id, content);
    setTextId(id);
    setTextContent(content);
  };

  const handleDelete = (id: any) => {
    localStorage.removeItem(id);
    let textIds = JSON.parse(localStorage.getItem("TextIds") || "{}");
    var filteredAry = textIds.filter((e: any) => e !== id);
    localStorage.setItem("TextIds", JSON.stringify(filteredAry));
    setTextIdArr(filteredAry);
    if (filteredAry.length === 0) {
      alert();
      const newId = uuidv4();
      textIdArr.push(newId);
      localStorage.setItem("TextIds", JSON.stringify([newId]));
      localStorage.setItem(newId, "");
      setTextId(newId);
      setTextIdArr(textIdArr);
      setTextContent("");
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{ background: "#2E3B55" }}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              WordPad
            </Typography>
            <div className={classes.drawerHeader}>
              <Tooltip title="Add" aria-label="add">
                <IconButton color="inherit" size="medium" onClick={handleAdd}>
                  <AddBoxSharpIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {textIdArr.map((id) => (
              <Fragment>
                <Divider />
                <ListItem
                  button
                  key={id}
                  id={id}
                  onClick={(event) => handleGetContent(id)}
                >
                  <ListItemText primary={localStorage.getItem(id)!} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(event) => handleDelete(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </Fragment>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <TextField
            placeholder="Your content.."
            fullWidth
            multiline
            value={textContent || ""}
            onChange={handleTextContent}
            InputProps={{ disableUnderline: true }}
          />
        </main>
      </div>
    </Fragment>
  );
}
