import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../utils/input/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { setPopupDisplay } from '../../reducers/fileReducer'
import { createDir } from '../../actions/file'

export const Popup = () => {
  const [dirName, setDirName] = useState('')
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)
  const popupDisplay = useSelector((state) => state.files.popupDisplay)

  function createDirHandler() {
    dispatch(createDir(currentDir, dirName))
    dispatch(setPopupDisplay('none'))
    setDirName('')
  }

  function setPopupDisplayHandler() {
    dispatch(setPopupDisplay('none'))
  }

  return (
    <div className="popup" style={{ display: popupDisplay }} onClick={setPopupDisplayHandler}>
      <div className="popup__content" onClick={(event) => event.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <div className="popup__close">
            <FontAwesomeIcon onClick={setPopupDisplayHandler} icon={faWindowClose} size="lg" className="popup__icon" />
          </div>
        </div>
        <Input type="text" placeholder="Введите название папки" value={dirName} setValue={setDirName} />
        <button className="popup__create" onClick={createDirHandler}>
          Создать
        </button>
      </div>
    </div>
  )
}
