import { useEffect, useState } from "react"
import ResponsiveMenu, { Header, Main, Title } from "../../components/sharedstyles"
import Link from "next/link"
import { parseCookies } from "nookies"
import axios from "axios"
import PlanCards from "../../components/planCards"
import { useRouter } from "next/router"

export default function PlansPage() {

  const router = useRouter()
  const [display, setDisplay] = useState('none')
  const { 'token': token } = parseCookies()
  const [userAuth , setUserAuth] = useState(true)
  const [listPrices, setListPrices] = useState([])
  const [access, setAccess] = useState('Gratuito'||'Premium'||'Anual')
  
  const FetchPrices = async () =>{
    try {
      const response = await axios.post('http://localhost:3000/api/subscriptionCheck',{
       token:token
     })
     const list = response.data
     setAccess(list)
    } catch (error) {
      console.log(error);
    }
    try {
     const response = await axios.post('http://localhost:3000/api/prices',{
       token:token
     })
     const list = response.data.data
     setListPrices(list)
    }  catch (error) {
     console.log(error);
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
          FetchPrices()
          setUserAuth(true)
        })
        .catch(()=>{setUserAuth(false)})
      } catch (error) {
        setUserAuth(false)
      }
    }
  },[token])

  if (userAuth === false) {
    router.push("/login");
  }

  return(
    <>
      <Header display={display} >
        <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
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
        <Title>Planos</Title>
        <PlanCards token={token} listPrices={listPrices} access={access} />
      </Main>
    </>
  )
}