import { useState } from 'react'
import { Input } from '../../utils/input/Input'
import { login } from '../../actions/user'
import './registration.scss'
import { useDispatch } from 'react-redux'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  function loginHandler() {
    dispatch(login(email, password))
  }

  return (
    <div className="authorization">
      <div className="authorization__header">Авторизация</div>
      <Input value={email} setValue={setEmail} placeholder="Введите email..." type="text" />
      <Input placeholder="Введите пароль..." type="password" value={password} setValue={setPassword} />
      <button className="authorization__btn" onClick={loginHandler}>
        Войти
      </button>
    </div>
  )
}
