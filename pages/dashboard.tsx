import React, { useEffect, useState } from "react"
import Link from "next/link"
import ResponsiveMenu, { Header, Main, Title } from "../components/sharedstyles"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import axios from "axios"
import studyCycle from "../utils/interfaces"
import Cards from "../components/cards"
import Statistics from "../components/statistics"
export default function Dashboard() {
  const { 'token': token } = parseCookies()
  const [userAuth , setUserAuth] = useState(true)
  const [StudyCycle , setStudyCycle] = useState<studyCycle[]>([])
  const [examList, setExamList] = useState([]) 
  const router = useRouter()
  const [display, setDisplay] = useState('none')
  useEffect(()=>{
    if (!token) {
      setUserAuth(false)
    } else {
      try {
         axios.post('/api/auth/verify_token', {
          token,
        })
        .then(()=> { setUserAuth(true)})
        .catch(()=>{setUserAuth(false)})
      } catch (error) {
        setUserAuth(false)
      }
    }
  },[token])
  if (userAuth === false) {
    router.push("/login")
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/study-cycle/get-study-cycle',{
          token,
        })
        if (response?.data?.StudyCycle?.subjects === undefined ) {
          setStudyCycle([])
        } else {
          setStudyCycle(response.data.StudyCycle.subjects)
        }
        
      } catch (error) {
        console.log(error)
      }
      try {
        const response = await axios.post('/api/exams/getExams', {
          token,
        })
        setExamList(response.data.listQuestions)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchDataAndUpdateList = async () => {
      if (token) {
        await fetchData()
      }
    }
    fetchDataAndUpdateList()
    }, [token])
  return (
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
          <div>
            <Link href={'settings'}>Configurações</Link>
          </div>
        </nav>
        <ResponsiveMenu display={display} setDisplay={setDisplay}/>
      </Header>
      <Main>
        <Title>Dashboard</Title>
        <Cards/>
        <Statistics StudyCycle={StudyCycle} examList={examList}/>
      </Main>
    </>
  )
}
