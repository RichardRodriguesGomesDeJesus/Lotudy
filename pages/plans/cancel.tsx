import { useEffect, useState } from "react"
import ResponsiveMenu, { Header, Main, Title } from "../../components/sharedstyles"
import Link from "next/link"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import axios from "axios"
import CancelBoard from "../../components/cancelBoard"

export default function cancelPlan() {
  const router = useRouter()
  const [display, setDisplay] = useState('none')
  const { 'token': token } = parseCookies()
  const [userAuth , setUserAuth] = useState(true)
  const [access, setAccess] = useState('Gratuito'||'Premium'||'Anual')

  const  FetchData = async ()=>{
    await axios.post('/api/subscriptionCheck',{
      token:token
    })
    .then((res)=>{
     setAccess(res.data)
    })
    .catch((err)=>console.log(err))
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
        <Title>Cancelar Plano Atual</Title>
        <CancelBoard access={access} token={token} setAccess={setAccess} />
      </Main>
    </>
  )
}