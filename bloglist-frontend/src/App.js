import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogService from './services/blogs'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const returnUser = await loginService.login({ username, password })

      window.localStorage.clear()
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(returnUser)
      )

      setUser(returnUser)
      setUsername('')
      setPassword('')
      setMessage({ 'messageStatus': 'success', 'message': 'Login Sucess' })

    } catch (expection) {
      setMessage({ 'messageStatus': 'error', 'message': 'Wrong Username or Password' })
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setMessage({ 'messageStatus': 'success', 'message': 'Logout' })
    setTimeout(() => setMessage(null), 3000)
  }


  const handleFormSubmit = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    blogService.createBlog({ title, author, url })
      .then(returnedBlog => {
        returnedBlog.user = {
          'username': user.username,
          'name': user.name,
          'id': returnedBlog.user
        }
        setMessage({ 'messageStatus': 'success', 'message': `a new blog ${title} by ${author}` })
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')

        setTimeout(() => setMessage(null), 5000)
      })

  }



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')


    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLikes = id => {
    blogService.updateLikes(id)
      .then(returnedBlog => {
        returnedBlog.user = {
          'username': user.username,
          'name': user.name,
          'id': returnedBlog.user
        }
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

      })
  }

  const handleDelete = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      blogService.deleteBlog(id)
        .then(returnedBlog => {
          console.error(returnedBlog)
          setBlogs(blogs.filter(e => e.id !== id))
        }).catch(e => console.log(e))
    }
  }



  const blogList = () => {

    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in <button onClick={handleLogout}>LogOut</button></p>
        <br />
        {user.username}
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .filter(blog => blog.user.username === user.username)
          .map(e => <Blog key={e.id} blog={e} handleLikes={() => handleLikes(e.id)} handleDelete={() => handleDelete(e.id, e.title, e.author)} />)
        }
      </div>
    )
  }




  return (
    <div>
      <h1> Blogs </h1>
      <Notification message={message} />
      {user === null ?
        <Togglable buttonLabel='Login In' buttonBottomLabel='cancel'>
          <LoginForm
            message={message}
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable> :
        <div>
          <Togglable buttonLabel='create new blog' buttonBottomLabel='cancel' ref={blogFormRef}>
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleFormSubmit={handleFormSubmit}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
            />
          </Togglable>
          {blogList()}
        </div>
      }

    </div>
  )
}

export default App
