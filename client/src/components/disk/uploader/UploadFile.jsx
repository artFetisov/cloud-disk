import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../../reducers/uploadReducer'

export const UploadFile = ({ file }) => {
  const dispatch = useDispatch()

  function removeFileHandler() {
    dispatch(removeUploadFile(file.id))
  }

  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>
        <div className="upload-file__remove">
          <FontAwesomeIcon
            onClick={removeFileHandler}
            className="upload-file__close-icon"
            icon={faWindowClose}
            size="1x"
          />
        </div>
      </div>
      <div className="upload-file__progress-bar">
        <div className="upload-file__upload-bar" style={{ width: file.progress + '%' }}></div>
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  )
}
