import { Fragment, useState, useEffect } from "react";
import {
  TextField,
  Drawer,
  Divider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./constants/";

export function TextEditor(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [tabItem, setTabItem] = useState<any[]>([]);
  const tabTitlePrefix = "New Tab";
  const tabIdPrefix = "tab_";

  useEffect(() => {
    console.log("tabItem:", tabItem.length);
    if (tabItem.length === 0) {
      tabItem.push({
        id: `${tabIdPrefix}0`,
        title: `${tabTitlePrefix}`,
        value: "",
      });
    }
    setTabItem(tabItem);
    console.log("tabItem:", tabItem);
    /* return () => {
      cleanup;
    }; */
  }, [tabItem]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewTab = () => {
    const id = tabItem.length + 1;
      tabItem.push({
        id: `${tabIdPrefix}id`,
        title: `${tabTitlePrefix}`,
        value: "",
      });
    setTabItem(tabItem);
    console.log("tabItem:", tabItem, tabItem.length);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
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
              <IconButton onClick={addNewTab}>
                <AddIcon />
              </IconButton>
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
            {tabItem.map((tab) => (
              <ListItem button key={tab.id}>
                <ListItemText primary={tab.title} />
              </ListItem>
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
              placeholder="Enjoy editing..."
              fullWidth
              multiline
              InputProps={{ disableUnderline: true }}
            />
        </main>
      </div>
    </Fragment>
  );
}
