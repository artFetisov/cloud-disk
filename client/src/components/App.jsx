import { Navbar } from './navbar/Navbar'
import './app.scss'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Registration } from './authorization/Registration'
import { Login } from './authorization/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from '../actions/user'
import { Disk } from './disk/Disk'
import { Profile } from './profile/Profile'

function App() {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ? (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/" exact component={Disk} />
              <Route path="/profile" exact component={Profile} />
              <Redirect to="/" />
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
