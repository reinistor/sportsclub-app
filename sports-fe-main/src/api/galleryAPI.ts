import instance from './instance'

export const galleryAPI = {
    // GET
    getAllImagesFromGallery() {
        return instance.get(`gallery`)
    },

    // POST
    postImageToGallery(dataUrl: any) {
        return instance.post(`gallery`, { dataUrl })
    },

    // DELETE
    deleteImageFromGallery(id: string) {
        return instance.delete(`gallery/${id}`)
    },
}
