import {BsFillHeartFill} from 'react-icons/bs'
import FavoriteContext from '../../context/FavoriteContext'
import './index.css'

const JobsCard = props => {
  const {booksData, onClickAuthor} = props
  const {id, title, readStatus, rating, authorName, coverPic} = booksData
  const onClickAuthorItem = () => {
    onClickAuthor(id)
  }

  return (
    <li className="all-book-item">
      <img
        src={coverPic}
        alt="img"
        className="all-book-img"
        onClick={onClickAuthorItem}
      />
      <div>
        <p className="book-title">{title}</p>
        <p className="author-name">{authorName}</p>
        <p className="author-name">
          Avg Rating{' '}
          <img
            src="https://res.cloudinary.com/dmonf0pws/image/upload/v1652076347/Icon_jlryah.svg"
            alt="star"
          />{' '}
          {rating}
        </p>
        <p>
          Status : <span className="read-status">{readStatus}</span>
        </p>
        <FavoriteContext.Consumer>
          {value => {
            const {favoriteList, onToggleFavorite} = value
            const isChecked = favoriteList.find(eachItem => eachItem.id === id)
            const onChangeFavorite = () => {
              onToggleFavorite({
                id,
                title,
                readStatus,
                rating,
                authorName,
                coverPic,
              })
            }
            return (
              <>
                <input
                  className="favorite-input"
                  onChange={onChangeFavorite}
                  id={id}
                  type="checkBox"
                />
                <label htmlFor={id}>
                  <div className="favorite-container">
                    <p className="book-details-status-heading">MyFavorite</p>
                    {isChecked ? (
                      <BsFillHeartFill className="favorite-icon-book-details-selected" />
                    ) : (
                      <BsFillHeartFill className="favorite-icon-book-details" />
                    )}
                  </div>
                </label>
              </>
            )
          }}
        </FavoriteContext.Consumer>
      </div>
    </li>
  )
}
export default JobsCard
