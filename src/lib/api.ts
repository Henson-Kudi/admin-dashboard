import axios from 'axios'
import envConf from './env.conf'

const api = axios.create({
    baseURL: envConf.apiBaseUrl,
    withCredentials: true,
})

let accessToken: string | null = null
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

// Request interceptor (inject most recent access token for each request)
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor (try to refresh access token with valid refresh token)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`
                    return api(originalRequest)
                }).catch(err => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const { data } = await api.post('/refresh-token')
                accessToken = data.accessToken

                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

                processQueue(null, accessToken)
                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                accessToken = null
                // Redirect to login or handle authentication failure
                window.location.href = '/auth/login'
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api