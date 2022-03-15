import { useSelector } from 'react-redux'
import { File } from './file/File'
import './filelist.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const FileList = () => {
  const fileView = useSelector((state) => state.files.view)
  const files = useSelector((state) => state.files.files)

  if (!files.length) {
    return <div className="loader">Файлы не найдены</div>
  }

  if (fileView === 'plate') {
    return (
      <div className="fileplate">
        {files.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    )
  }

  if (fileView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Название</div>
          <div className="filelist__date">Дата</div>
          <div className="filelist__size">Размер</div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition key={file._id} classNames={'file'} timeout={500} exit={false}>
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }
}
