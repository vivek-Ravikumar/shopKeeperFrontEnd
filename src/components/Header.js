import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    background: "#000000",
    alignContent: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const allTransactionPage = () => {
    history.push("/allTransaction");
  };
  const homePage = () => {
    history.push("/");
  };

  return (
    <div className={`${classes.root} header `}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h5" onClick={homePage} className={classes.title}>
            Purchase Tracker
          </Typography>

          <Button color="inherit" onClick={allTransactionPage}>
            {" "}
            All Transactions
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
