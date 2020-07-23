import axios from 'axios'
import cache from 'memory-cache'
import qs from 'query-string'

import config from '../../config'

const api = {}

api.request = (path, options = {}) => {
  const { method, data, refresh } = options

  if (!refresh) {
    const cachedData = cache.get(path)
    if (cachedData) {
      return { ...cachedData, isCached: true }
    }
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: method || 'get',
        url: `${config.api.root_url}/${path}`,
        data: data || null,
      })
      .then(async ({ data }) => {
        cache.put(path, data)
        resolve({ ...data, isCached: false })
      })
      .catch(err => reject(err.response.data))
  })
}

api.get = async (path, options = {}) => {
  if (options.query) {
    path += `?${qs.stringify(options.query)}`
  }
  return await api.request(path, options)
}

api.post = async (path, options = {}) => {
  return await api.request(path, { ...options, method: 'post' })
}

export default api
