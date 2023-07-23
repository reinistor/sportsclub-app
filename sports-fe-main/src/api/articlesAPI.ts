import instance from './instance'

export const articlesAPI = {
    // GET
    getArticles() {
        return instance.get(`articles`)
    },

    // GET
    getArticle(id: string) {
        return instance.get(`articles/${id}`)
    },

    // GET
    getArticlesOfUser(id: string) {
        return instance.get(`articles/user/${id}`)
    },

    // POST
    postArticle(
        id: string,
        shortTitle: string,
        longTitle: string,
        content: string,
        imageURL: string
    ) {
        return instance.post(`articles`, {
            id,
            shortTitle,
            longTitle,
            content,
            imageURL,
        })
    },

    // DELETE
    deleteArticle(id: string) {
        return instance.delete(`articles/${id}`)
    },
}
