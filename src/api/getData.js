import instance from '@/utls/request'

const getData = () => {
  return instance.get('/good/goodAll')
    .then(response => response.data)

    .catch(error => {
      console.error('Error fetching data:', error)
      throw error
    })
}

export default getData
