import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { observer, useLocalStore } from "mobx-react-lite"
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { Route, Switch, HashRouter } from "react-router-dom"
import { toJS } from "mobx";
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import './monokai-sublime.less'
hljs.registerLanguage('javascript', javascript);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const DIRECTORY_INFO = [{
  title: '2019/12',
  open: false,
  children: [
    {
      title: 'send post request to download excel file',
      path: '/201912-send-post-request-to-download-excel-file'
    }
  ]
}]

function ResponsiveDrawer(props) {
  const store = useLocalStore(
    source => ({
      source,
      mobileOpen: false,
      handleDrawerToggle() {
        store.mobileOpen = !store.mobileOpen
      },
      directoryInfo: DIRECTORY_INFO,
      handleDirectoryClick(info) {
        return () => {
          console.log('info', toJS(info))
          info.open = !info.open
        }
      },
      handleLink(item) {
        return () => {
          window.location.hash = item.path
        }
      }
    }),
    props
  );

  useEffect(() => {
    hljs.initHighlightingOnLoad()
  }, [])

  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const { mobileOpen, handleDrawerToggle, directoryInfo, handleDirectoryClick } = store

  console.log('directoryInfo', directoryInfo)

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {
        directoryInfo.map(info => {
          return <div key={info.title}>
            <ListItem button onClick={handleDirectoryClick(info)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="2019/12" />
              {info.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={info.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  info.children.map(child => {
                    return <ListItem button key={child.title} className={classes.nested}>
                      <ListItemText primary={child.title} onClick={store.handleLink(child)} />
                    </ListItem>
                  })
                }
              </List>
            </Collapse>
            <Divider />
          </div>
        })
      }
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {/* Responsive drawer */}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <HashRouter>
          <Switch>
            <Route path="/201912-send-post-request-to-download-excel-file" exact render={() => {
              return <pre>
                <Typography paragraph>
                <code className="javascript">
                  {`handleExport(columns) {
                      const sendData = {}
                      const xhr = new XMLHttpRequest()
                      xhr.responseType = 'arraybuffer'
                      xhr.open('post', '/your-url', true)
                      xhr.onload = function() {
                        let url = window.URL.createObjectURL(new Blob([this.response],
                          {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet charset=utf-8'}))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        const fileName = "yourFileName"
                        link.setAttribute('download', fileName)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }
                      xhr.setRequestHeader('content-type', 'application/json')
                      xhr.send(JSON.stringify(sendData))
                    },`
                  }
                </code>
                </Typography>
              </pre>
            }} />
          </Switch>
        </HashRouter>
      </main>
    </div>
  );
}

export default observer(ResponsiveDrawer)
