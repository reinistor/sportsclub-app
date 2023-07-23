import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        authorization: `Bearer ${localStorage
            .getItem('accessToken')
            ?.replace(/^"(.+(?="$))"$/, '$1')}`,
    },
})

export default instance
