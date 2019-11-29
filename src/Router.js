import React, { useEffect, createContext } from "react"
import { observer, useLocalStore } from "mobx-react-lite"
import { Route, Switch, HashRouter } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import ConsumerWrapper from '@src/containers/ConsumerWrapper'
import Home from './pages/home/index'

export const RouterContext = createContext()

const Router = observer(props => {
  const globalStore = useLocalStore(
    source => ({
    }),
    props
  )

  useEffect(() => {
  }, [])

  return <RouterContext.Provider value={globalStore}>
    <CssBaseline />
    <HashRouter>
      <Switch>
        <Route path="/" exact component={ConsumerWrapper(Home)} />
        <Route path="/Home" component={ConsumerWrapper(Home)} />
      </Switch>
    </HashRouter>
  </RouterContext.Provider>
})

export default Router
