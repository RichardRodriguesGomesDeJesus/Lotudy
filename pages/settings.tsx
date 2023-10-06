import { useEffect, useState } from "react"
import ResponsiveMenu, { Header, Main, Title } from "../components/sharedstyles"
import Link from "next/link"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import axios from "axios"
import SettingsBoard from "../components/settingsBoard"


export default function settings() {

  const router = useRouter()
  const [display, setDisplay] = useState('none')
  const { 'token': token } = parseCookies()
  const [userAuth , setUserAuth] = useState(true)
  const [listPrices, setListPrices] = useState([])
  const [access, setAccess] = useState('Gratuito'||'Premium'||'Anual')
  const [userEmail, setUserEmail] = useState('')

  const FetchData = async () =>{
    try {
      const response = await axios.post('/api/subscriptionCheck',{
       token:token
     })
     const list = response.data
     setAccess(list)
    } catch (error) {
      console.log(error)
    }
    try {
      const response = await axios.post('/api/auth/email_user',{
        token:token
      })
      setUserEmail(response.data.email)
    } catch (error) {
      console.log(error)
    }
    try {
     const response = await axios.post('/api/prices',{
       token:token
     })
     const list = response.data.data
     setListPrices(list)
    }  catch (error) {
     console.log(error)
   }
  }
  useEffect(()=>{
    if (!token) {
      setUserAuth(false)
    } else {
      try {
         axios.post('/api/auth/verify_token', {
          token,
        })
        .then(()=> {
          FetchData()
          setUserAuth(true)
        })
        .catch(()=>{setUserAuth(false)})
      } catch (error) {
        setUserAuth(false)
      }
    }
  },[token])

  if (userAuth === false) {
    router.push("/login")
  }
  return(
    <>
      <Header display={display} >
        <img src="../logo-lotudy-removebg.png" alt="logo da lotudy" />
        <nav>
          <div>
            <Link href={'/'} >Home</Link>
          </div>
          <div>
            <Link href={'/exams'} >Simulados</Link>
          </div>
          <div>
            <Link href={'/study-cycle'} >Ciclo de estudos</Link>
          </div>
          <div>
            <Link href={'/flex-cards'}>Cards de Revisão</Link>
          </div>
        </nav>
        <ResponsiveMenu display={display} setDisplay={setDisplay}/>
      </Header>
      <Main>
        <Title>Painel de cofigurações</Title>
        <SettingsBoard plan={access} setPlan={setAccess} userEmail={userEmail} token={token} prices={listPrices}/>
      </Main>
    </>
  )
}