import Vue from 'vue'
import * as Services from '@/services'

export default ({ $axios, store, error: nuxtError }, inject) => {
  const max_retry = 3
  let retry_counter = 0

  const max_timeout_retry = 3
  let timeout_retry_counter = 0

  // axios instance
  const baseAxios = $axios.create({
    baseURL: '',
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-type': 'application/json; multipart/form-data',
    },
    timeout: 8000,
  })

  // if timeout, retry and notify request
  baseAxios.onError((error) => {
    if (
      (error.response &&
        error.response.status &&
        error.response.status === 408) ||
      error.code === 'ECONNABORTED'
    ) {
      const { config } = error
      if (timeout_retry_counter < max_timeout_retry) {
        timeout_retry_counter++
        return new Promise((resolve) => {
          resolve(baseAxios(config))
        })
      }
      if (timeout_retry_counter >= max_timeout_retry) {
        Vue.$toast.error('Something wrong happened: Code 8')
      }
    }

    timeout_retry_counter = 0
    return Promise.reject(error)
  })

  // api failed retry and error toast notification
  baseAxios.onResponseError((error) => {
    const config = error.config
    const convertCode = {
      400: 'Bad Request: Code 1', //Bad Request
      401: 'You must login to your acoount: Code 2', //Unauthorized
      408: 'Request Timeout: Code 3', //timeout
      502: 'Something wrong happened: Code 4', //Bad Gateway,
      504: 'Something wrong happened: Code 5', //Gateway Timeout
      405: 'Something wrong happened: Code 6', // Method Not Allowed
      413: 'Something wrong happened: Code 7', // Payload Too Large response
      403: 'Something wrong happened: Code 8', // Authentication Error
    }

    if (retry_counter < max_retry && error.response.status >= 500) {
      retry_counter++
      return new Promise((resolve) => {
        resolve(baseAxios(config))
      })
    }
    retry_counter = 0
    if (error.response.status < 500 && convertCode[error.response.status]) {
      Vue.$toast.error(convertCode[error.response.status])
    } else if (
      error.response.status < 500 &&
      !(error.response.status in convertCode)
    ) {
      if (error.response.status === 301 || error.response.status === 302) {
        return error.response
      }
      return nuxtError({ statusCode: error.response.status })
    } else {
      Vue.$toast.error('Something wrong happened')
    }

    return Promise.reject(error)
  })

  // Initialize API factories
  const factories = {
    general: Services.General(baseAxios),
  }

  // Inject $api
  inject('api', factories)
}
