import {Component} from 'react'

import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookItemDetails from './components/BookItemDetails'
import MyFavorites from './components/MyFavorites'
import FavoriteContext from './context/FavoriteContext'
import NotFound from './components/NotFound'

class App extends Component {
  state = {favoriteList: []}

  onToggleFavorite = bookDetails => {
    const {favoriteList} = this.state
    const isAlreadyExist = favoriteList.some(
      eachItem => eachItem.id === bookDetails.id,
    )

    if (isAlreadyExist === true) {
      this.setState(prevState => ({
        favoriteList: prevState.favoriteList.filter(
          eachBook => eachBook.id !== bookDetails.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        favoriteList: [...prevState.favoriteList, bookDetails],
      }))
    }
  }

  render() {
    const {favoriteList} = this.state
    return (
      <FavoriteContext.Provider
        value={{
          favoriteList,
          onToggleFavorite: this.onToggleFavorite,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
          <ProtectedRoute exact path="/favorites" component={MyFavorites} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </FavoriteContext.Provider>
    )
  }
}

export default App
