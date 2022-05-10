import {Component} from 'react'
import Slider from 'react-slick'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import TopRatedBooks from '../TopRatedBooks'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
}

class Home extends Component {
  state = {
    topRatedBooks: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedItem()
  }

  getTopRatedItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))

      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickAuthor = id => {
    const {history} = this.props
    history.push(`/books/${id}`)
  }

  onClickRetry = () => {
    this.getTopRatedItem()
  }

  renderBookDetails = () => {
    const {topRatedBooks} = this.state
    return (
      <div className="">
        <div className="slider-container">
          <div className="heading-container">
            <h1 className="top-rated-heading" key="author_name">
              Top Rated Books
            </h1>
            <button type="button" className="find-button">
              <NavLink to="/shelf" className="find-books">
                Find Books
              </NavLink>
            </button>
          </div>
          <Slider {...settings}>
            {topRatedBooks.map(eachItem => (
              <TopRatedBooks
                key={eachItem.id}
                booksData={eachItem}
                onClickAuthor={this.onClickAuthor}
              />
            ))}
          </Slider>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dmonf0pws/image/upload/v1652179675/Group_7522_ex3inj.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
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
    <div className="books-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height="50" width="50" />
    </div>
  )

  renderHome = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetails()
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
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button type="button" className="find-button-mobile">
            <NavLink to="/shelf" className="find-books">
              Find Books
            </NavLink>
          </button>
          <div className="">{this.renderHome()}</div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
