import instance from './instance'
import { PersonInterface } from '../interfaces/PersonInterface'

export const personAPI = {
    // GET
    getCoaches() {
        return instance.get(`club-members/coach`)
    },

    // GET
    getPlayers() {
        return instance.get(`club-members/player`)
    },

    // GET
    getJuniors() {
        return instance.get(`club-members/junior`)
    },

    // GET
    getYouths() {
        return instance.get(`club-members/youth`)
    },

    // GET
    getCadets() {
        return instance.get(`club-members/cadet`)
    },

    // GET
    getMiniVolleys() {
        return instance.get(`club-members/mini-volley`)
    },

    // DELETE
    deletePerson(id: string) {
        return instance.delete(`club-members/${id}`)
    },

    // POST
    async addPerson({
        image,
        fullName,
        nationality,
        position,
        type,
        birthDate,
        height,
    }: PersonInterface) {
        return instance.post(`club-members`, {
            image,
            fullName,
            nationality,
            position,
            type,
            birthDate,
            height,
        })
    },
}
