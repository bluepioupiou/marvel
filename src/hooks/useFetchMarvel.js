import { useEffect, useState } from "react"
import md5 from 'js-md5'

const publicKey = '6234015b1ce8dbc11cb2274c83e2b286'
const privateKey = 'dcd246109083f1b316b680b80c3e3004a9b66524'

const baseUrl = 'http://gateway.marvel.com/v1/public/'

export default (path) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const ts = Date.now()
      const hash = md5(ts + privateKey + publicKey) 
      setLoading(true)
      const response = await fetch(baseUrl + path + '&ts=' + ts + '&apikey=' + publicKey + '&hash='+hash)
      const result = await response.json()
      setData(result.data.results)
      setLoading(false)
    }
    fetchData()
  }, [path])

  return [ data, loading ]
}