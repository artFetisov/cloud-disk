import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { UploadFile } from './UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import './uploader.scss'
import { hideUploader } from '../../../reducers/uploadReducer'

export const Uploader = () => {
  const files = useSelector((state) => state.upload.files)
  const isVisible = useSelector((state) => state.upload.isVisible)
  const dispatch = useDispatch()

  function hideUploaderHandler() {
    dispatch(hideUploader())
  }

  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Загрузки</div>
          <div className="uploader__close">
            <FontAwesomeIcon
              className="uploader__close-icon"
              icon={faWindowClose}
              size="lg"
              onClick={hideUploaderHandler}
            />
          </div>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  )
}
