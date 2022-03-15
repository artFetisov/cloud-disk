import './file.scss'
import { faFile, faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile } from '../../../../actions/file'
import sizeFormat from '../../../../utils/sizeFormat'

export const File = ({ file }) => {
  const fileView = useSelector((state) => state.files.view)
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)

  function openDirHandler() {
    if (file.type === 'dir') {
      dispatch(setCurrentDir(file._id))
      dispatch(pushToStack(currentDir))
    }
  }

  function downloadClickHandler(event) {
    event.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(event) {
    event.stopPropagation()
    dispatch(deleteFile(file))
  }

  if (fileView === 'list') {
    return (
      <div className="file" onClick={openDirHandler}>
        <FontAwesomeIcon icon={file.type === 'dir' ? faFolder : faFile} size="3x" className="file__dir-icon" />
        <div className="file__name">{file.name}</div>
        {file.type !== 'dir' && (
          <button className="file__btn file__download">
            <FontAwesomeIcon className="file__download-icon" onClick={downloadClickHandler} icon={faDownload} size="1x" />
          </button>
        )}
        <button className="file__btn file__delete" onClick={deleteClickHandler}>
          <FontAwesomeIcon className="file__delete-icon" icon={faTrashAlt} size="1x" />
        </button>

        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{file.type !== 'dir' ? sizeFormat(file.size) : ''}</div>
      </div>
    )
  }

  if (fileView === 'plate') {
    return (
      <div className="file-plate" onClick={openDirHandler}>
        <FontAwesomeIcon icon={file.type === 'dir' ? faFolder : faFile} size="5x" className="file-plate__dir-icon" />
        <div className="file-plate__name">{file.name}</div>
        {/* {file.type !== 'dir' && (
          <button className="file-plate__btns file-plate__download">
            <FontAwesomeIcon className="file-plate__download-icon" onClick={downloadClickHandler} icon={faDownload} size="1x" />
          </button>
        )}
        <button className="file-plate__btns file-plate__delete" onClick={deleteClickHandler}>
          <FontAwesomeIcon className="file-plate__delete-icon" icon={faTrashAlt} size="1x" />
        </button> */}
      </div>
    )
  }
}
