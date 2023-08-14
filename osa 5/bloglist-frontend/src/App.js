import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [BlogName, setBlogName] = useState('')
  const [BlogURL, setBlogURL] = useState('')
  const [BlogAuthor, setBlogAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = 
    {
      title: BlogName,
      author: BlogAuthor,
      url: BlogURL,
      likes: 0,
      user: user
    }
  
    blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))    
  }

  const logOut = (event) => {
    setUser(null)
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>

      <p>{user.name} logged in</p>
      <button onClick={logOut}>
        Log out
      </button>

      <h2>create new</h2>
      
      <form onSubmit={addBlog}>
        <div>
        title:
        <input
          value={BlogName}
          onChange={({ target }) => setBlogName(target.value)}
        />
        </div>
        <div>
        author:
        <input
          value={BlogAuthor}
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
        </div>
        <div>
        url:
        <input
          value={BlogURL}
          onChange={({ target }) => setBlogURL(target.value)}
        />
        </div>
        <button type="submit">save</button>
      </form>  

      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App