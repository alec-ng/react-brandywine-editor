import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  colorPrimary: {
    backgroundColor: "rgb(255, 255, 255)"
  },
  root: {
    boxShadow: '0 2px 1px rgba(0,0,0, 0.1)'
  },
  toolbarRoot: {
    paddingTop: '10px',
    paddingBottom: '10px',
    justifyContent: 'flex-end'
  },
  toolbarRegular: {
    minHeight: 'auto'
  }
}));

/**
 * Sticky app bar that hides on scroll
 */
export default function DynamicAppBar({ children }) {
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        classes={{
          colorPrimary: classes.colorPrimary,
          root: classes.root
        }}
      >
        <Toolbar classes={{
          regular: classes.toolbarRegular,
          root: classes.toolbarRoot
        }}>
          {children}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}