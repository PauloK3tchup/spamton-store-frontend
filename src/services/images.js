import axios from 'axios'

class ImageService {
  async uploadImage(file) {
    const formData = new FormData()
    formData.set('file', file)
    const response = await axios.post('/api/media/images/', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

export default new ImageService()
