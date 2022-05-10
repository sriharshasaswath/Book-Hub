import Header from '../Header'
import Footer from '../Footer'
import FavoriteContext from '../../context/FavoriteContext'
import AllBooks from '../AllBooks'

import './index.css'

const MyFavorites = props => {
  const onClickedAddFavorite = () => {
    const {history} = props
    history.push('/shelf')
  }

  return (
    <>
      <Header />
      <FavoriteContext.Consumer>
        {value => {
          const {favoriteList} = value
          return (
            <div className="favorite-books-bg-container">
              <h1 className="favorite-books-heading">My Favorite Books</h1>
              <hr className="favorite-books-line" />
              {favoriteList.length === 0 ? (
                <div className="no-favorite-container">
                  <img
                    src="https://res.cloudinary.com/dmonf0pws/image/upload/v1652162804/ex4_kmsul6.png"
                    className="no-favorite-image"
                    alt="no favorite"
                  />
                  <p className="top-rated-failure-heading">
                    You've not added any favourites yet
                  </p>
                  <p>Would you like to add some of your favorite books now ?</p>
                  <button
                    className="failure-button"
                    onClick={onClickedAddFavorite}
                    type="button"
                  >
                    Add Favorites
                  </button>
                </div>
              ) : (
                <ul className="favorite-books-list-container">
                  {favoriteList.map(eachItem => (
                    <AllBooks key={eachItem.id} booksData={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </FavoriteContext.Consumer>
      <Footer />
    </>
  )
}

export default MyFavorites
