import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsFillHeartFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FavoriteContext from '../../context/FavoriteContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    booksItemList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksItem()
  }

  getFormattedData = data => ({
    id: data.id,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    aboutBook: data.about_book,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
    aboutAuthor: data.about_author,
  })

  getBooksItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.book_details)
      this.setState({
        booksItemList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBookItemDetails = () => {
    const {booksItemList} = this.state

    const {
      id,
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = booksItemList

    return (
      <div className="main-container">
        <div className="main-book-details-container">
          <div className="book-details-container">
            <img src={coverPic} alt={title} className="cover-page" />
            <div>
              <h1 key="title">{title}</h1>
              <p>{authorName}</p>
              <p className="author-name">
                Avg Rating <BsFillStarFill />
                {rating}
              </p>
              <p>
                Status: <span className="read-status">{readStatus}</span>
              </p>
              <FavoriteContext.Consumer>
                {value => {
                  const {favoriteList, onToggleFavorite} = value
                  const isChecked = favoriteList.find(
                    eachItem => eachItem.id === id,
                  )
                  const onChangeFavorite = () => {
                    onToggleFavorite({
                      id,
                      title,
                      readStatus,
                      rating,
                      authorName,
                      aboutAuthor,
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
                          <p className="book-details-status-heading">
                            MyFavorite
                          </p>
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
          </div>
          <hr />
          <div>
            <h1 className="about-heading">About Author</h1>
            <p>{aboutAuthor}</p>
            <h1 className="about-heading">About Book</h1>
            <p className="about-book">{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getBooksItem()
  }

  renderFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dmonf0pws/image/upload/v1652179675/Group_7522_ex3inj.png"
        alt="failure view"
      />
      <p className="top-rated-books-failure-heading">
        Something Went Wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderBooksItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderBooksItem()}
        <Footer />
      </div>
    )
  }
}

export default BookItemDetails
