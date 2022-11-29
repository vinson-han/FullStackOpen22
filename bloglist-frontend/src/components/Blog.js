import Togglable from './Togglable'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  // const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,

  }

  // const handleLikes = async() => {
  //   const returnedBlog = await blogService.updateLikes(blog.id)
  //   setLikes(returnedBlog.likes + 1)

  // }

  return (
    <div style={blogStyle}>
      <Togglable title={blog.title} buttonLabel='view' buttonBottomLabel='hide'>

        <div>{blog.url}</div>
        <div>{blog.id}</div>
        <div>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.author}</div>
      </Togglable>
      <button onClick={handleDelete}>remove</button>


    </div>
  )
}

export default Blog