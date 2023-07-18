import React, { useEffect, useState } from "react";
import Link from "next/link";
import ResponsiveMenu, { Footer, Header, Main, Title } from "../components/sharedstyles";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import axios from "axios";
import PieChart from "../components/pieChart";
import studyCycle from "../utils/interfaces";
import Cards from "../components/cards";
import Statistics from "../components/statistics";

export default function Dashboard() {
  const { 'token': token } = parseCookies();
  const [userAuth , setUserAuth] = useState(true)
  const [StudyCycle , setStudyCycle] = useState<studyCycle[]>([])
  const router = useRouter();
  const [translateX, setTranslateX] = useState('100%');
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
    router.push("/login");
  }
  useEffect(() => {
    const fetchStudyCycle = async () => {
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
        console.log(error);
      }
    };
  
    const fetchStudyCycleAndUpdateList = async () => {
      if (token) {
        await fetchStudyCycle();
      }
    };
  
    fetchStudyCycleAndUpdateList();
    }, [token]);
  return (
    <>
      <Header translateX={translateX} >
        <nav>
          <div>
            <Link href={'/'} >Home</Link>
          </div>
          <div>
            <Link href={'/exams'} >Exams</Link>
          </div>
          <div>
            <Link href={'/study-cycle'} >Study cycle</Link>
          </div>
          <div>
            <Link href={'/flex-cards'}>Flash Cards</Link>
          </div>
        </nav>
        <ResponsiveMenu translateX={translateX} setTranslateX={setTranslateX}/>
      </Header>
      <Main>
        <Title>Dashboard</Title>
        <Cards/>
        <Statistics StudyCycle={StudyCycle}/>
      </Main>
      <Footer>
        <Link href={'/register'}>Crie sua conta</Link>
      </Footer>
    </>
  );
}
