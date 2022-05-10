import './index.css'

const JobsCard = props => {
  const {booksData, onClickAuthor} = props
  const {id, authorName, coverPic, title} = booksData
  const onClickAuthorItem = () => {
    onClickAuthor(id)
  }

  return (
    <li className="book-item">
      <img
        src={coverPic}
        alt={title}
        className="book-img"
        onClick={onClickAuthorItem}
      />
      <h1 className="book-title">{title}</h1>
      <p className="author-name">{authorName}</p>
    </li>
  )
}
export default JobsCard
