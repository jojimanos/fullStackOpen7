import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...

  const create = async (resource) => {
  try {
    const response = await axios.post(baseUrl)
  } catch (error) {
    console.log("Axios get error", error)
  }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

