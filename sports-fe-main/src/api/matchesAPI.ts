import instance from './instance'

export const matchesAPI = {
    // GET NEXT
    async getNextMatches() {
        return instance.get(`matches/next`)
    },
    // GET PREVIOUS
    async getPreviousMatches() {
        return instance.get(`matches/previous`)
    },
}
