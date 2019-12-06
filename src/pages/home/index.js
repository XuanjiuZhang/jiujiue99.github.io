import React, { useEffect } from "react";
import "./index.less";
import { makeStyles } from "@material-ui/core/styles";
import { observer, useLocalStore } from "mobx-react-lite"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ResponsibleDrawer from '@src/components/ResponsibleDrawer'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.status.danger,
  }
}))

const Home = observer(props => {
  const store = useLocalStore(
    source => ({
      source,
    }),
    props
  );

  useEffect(() => {
  }, [])

  const classes = useStyles()
  return (
    <div className="">
      <ResponsibleDrawer />
    </div>
  )
})

export default Home
