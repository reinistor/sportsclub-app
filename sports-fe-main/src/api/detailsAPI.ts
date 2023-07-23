import instance from './instance'

export const detailsAPI = {
    // GET
    getVision() {
        return instance.get(`text-sections/vision`)
    },

    getHistory() {
        return instance.get(`text-sections/history`)
    },

    // PUT
    updateVision(text: string) {
        return instance.put('text-sections/vision', {
            content: text,
        })
    },

    // PUT
    updateHistory(text: string) {
        return instance.put('text-sections/history', {
            content: text,
        })
    },
}
