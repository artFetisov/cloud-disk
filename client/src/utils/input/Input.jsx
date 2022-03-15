import './input.scss'

export const Input = ({ placeholder, type, setValue, value }) => {
  return <input type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className="input__comp" />
}
