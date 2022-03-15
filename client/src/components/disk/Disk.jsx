import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import { setCurrentDir, setPopupDisplay, setView } from '../../reducers/fileReducer'
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './disk.scss'
import { FileList } from './fileList/FileList'
import { Popup } from './Popup'
import { Uploader } from './uploader/Uploader'

export const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)
  const loader = useSelector((state) => state.app.loader)
  const dirStack = useSelector((state) => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState('type')

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  function backCkickHandler() {
    const backDir = dirStack.pop()
    dispatch(setCurrentDir(backDir))
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach((file) => dispatch(uploadFile(file, currentDir)))
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  function dropHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    const files = [...event.dataTransfer.files]
    files.forEach((file) => dispatch(uploadFile(file, currentDir)))
    setDragEnter(false)
  }

  function setSortHandler(event) {
    setSort(event.target.value)
  }

  if (loader)
    return (
      <div className="loader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={backCkickHandler}>
          Назад
        </button>
        <button className="disk__create" onClick={showPopupHandler}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label className="disk__upload-label" htmlFor="disk__upload-input">
            Загрузить файл
          </label>
          <input
            onChange={fileUploadHandler}
            className="disk__upload-input"
            id="disk__upload-input"
            type="file"
            multiple={true}
          />
        </div>
        <div className="disk__select">
          <select className="disk__select-sel" onChange={setSortHandler} value={sort}>
            <option value="type">По типу</option>
            <option value="name">По имени</option>
            <option value="date">По дате</option>
            <option value="size">По размеру</option>
          </select>
        </div>

        <button className="disk__plate">
          <FontAwesomeIcon icon={faThLarge} size="2x" onClick={() => dispatch(setView('plate'))} />
        </button>
        <button className="disk__list">
          <FontAwesomeIcon icon={faThList} size="2x" onClick={() => dispatch(setView('list'))} />
        </button>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drag__area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  )
}
