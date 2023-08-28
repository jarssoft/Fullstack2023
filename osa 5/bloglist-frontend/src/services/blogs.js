import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const url = `/api/blogs/${newObject.id}`
  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const url = `/api/blogs/${newObject.id}`
  const response = await axios.delete(url, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, put, remove }