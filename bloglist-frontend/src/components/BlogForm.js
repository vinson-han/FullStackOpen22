import PropTypes from 'prop-types'

const BlogForm = ({
  title,
  author,
  url,
  handleFormSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'> Create Blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm