import axios from 'axios'
const baseUrl = '/api/blogs'



let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token, 'createBlog')

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogId}`, '', config).catch(error => console.log(error))
  return response.data

}



const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }


  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data

}



const blogService = {
  getAll,
  createBlog,
  setToken,
  updateLikes,
  deleteBlog
}

export default blogService