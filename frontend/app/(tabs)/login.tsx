import {useEffect} from 'react'
import {useRouter} from 'expo-router'

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("(others)/user_profile");
  },[router])

  return null
}

export default Login