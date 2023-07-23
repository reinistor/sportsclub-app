import instance from './instance'

export const userAPI = {
    // POST
    login(email: string, password: string) {
        return instance.post(`/login`, { email, password })
    },

    // GET
    me(token: string | null) {
        return instance.get(`/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
}
