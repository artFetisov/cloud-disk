import './navbar.scss'
import { faFeatherAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { getFiles, searchFiles } from '../../actions/file'
import { useState } from 'react'
import { showLoader } from '../../reducers/appReducer'
import { API_URL } from '../../config'

export const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const currentDir = useSelector((state) => state.files.currentDir)
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  const [searchTimeout, setSearchTimeout] = useState(false)
  const avatar = currentUser.avatar ? (
    <img src={`${API_URL + currentUser.avatar}`} alt="avatar" className="navbar__avatar" />
  ) : (
    <FontAwesomeIcon icon={faUser} size="3x" className="navbar__avatar" />
  )

  function logoutHandler() {
    dispatch(logout())
  }

  function setSearchHandler(e) {
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    dispatch(showLoader())
    if (e.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(e.target.value))
          },
          500,
          e.target.value
        )
      )
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/disk">
          <FontAwesomeIcon icon={faFeatherAlt} size="2x" className="navbar__icon" />
        </NavLink>
        <div className="navbar__header">
          <NavLink to="/disk">MERN Cloud</NavLink>
        </div>

        {isAuth && <input className="navbar__search" type="text" placeholder="Поиск файлов..." onChange={setSearchHandler} />}
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Регистрация</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__logout" onClick={logoutHandler}>
            Выйти
          </div>
        )}
        {isAuth && <NavLink to="/profile">{avatar}</NavLink>}
      </div>
    </div>
  )
}
