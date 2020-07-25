import axios from 'axios'
import cache from 'memory-cache'
import qs from 'query-string'

import config from '../../config'

const api = {}

api.request = (path, options = {}) => {
  const { method, data } = options

  return new Promise((resolve, reject) => {
    axios
      .request({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: method || 'get',
        url: `${config.api.root_url}/${path}`,
        data: data || null,
      })
      .then(async res => resolve(res.data))
      .catch(err => reject(err.response.data))
  })
}

api.get = async (path, options = {}) => {
  const { query, refresh } = options
  if (query) {
    path += `?${qs.stringify(query)}`
  }

  if (!refresh) {
    const cachedData = cache.get(path)
    if (cachedData) {
      return { ...cachedData, isCached: true }
    }
  }

  const data = await api.request(path, options)
  cache.put(path, data)
  return { ...data, isCached: false }
}

api.post = async (path, options = {}) => {
  return await api.request(path, { ...options, method: 'post' })
}

export default api
