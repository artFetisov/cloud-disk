import { useState } from 'react'
import { Input } from '../../utils/input/Input'
import { registration } from '../../actions/user'
import './registration.scss'

export const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function registrationHandler() {
    registration(email, password)
  }

  return (
    <div className="authorization">
      <div className="authorization__header">Регистрация</div>
      <Input value={email} setValue={setEmail} placeholder="Введите email..." type="text" />
      <Input placeholder="Введите пароль..." type="password" value={password} setValue={setPassword} />
      <button className="authorization__btn" onClick={registrationHandler}>
        Зарегестрироваться
      </button>
    </div>
  )
}
