import { useDispatch } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../../actions/user'

export const Profile = () => {
  const dispatch = useDispatch()

  function changeAvatarhandler(e) {
    const file = e.target.files[0]
    dispatch(uploadAvatar(file))
  }

  function deleteAvatarHandler() {
    const conf = window.confirm('Вы точно хотите удалить изображение?')
    if (conf) {
      dispatch(deleteAvatar())
    }
  }

  return (
    <div className="profile">
      <button onClick={deleteAvatarHandler}>удалить</button>
      <input type="file" onChange={changeAvatarhandler}></input>
    </div>
  )
}
