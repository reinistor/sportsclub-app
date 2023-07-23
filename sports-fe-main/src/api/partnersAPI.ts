import instance from './instance'
import { PartnerInterface } from '../interfaces/PartnerInterface'

export const partnersAPI = {
    // GET
    getPartners() {
        return instance.get(`sponsors`)
    },

    // DELETE
    deletePartner(id: string) {
        return instance.delete(`sponsors/${id}`)
    },

    // POST
    async addPartner({ logo, website, name }: PartnerInterface) {
        return instance.post(`sponsors`, {
            logo,
            website,
            name,
        })
    },
}
