import React, { useEffect, useState } from "react";
import Link from "next/link";
import ResponsiveMenu, { Header, Main, NavLink, Title } from "../components/sharedstyles";
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
  const [display, setDisplay] = useState('none');
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
      <Header display={display} >
        <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
        <nav>
          <div>
            <NavLink href={'/'} >Home</NavLink>
          </div>
          <div>
            <NavLink href={'/exams'} >Exams</NavLink>
          </div>
          <div>
            <NavLink href={'/study-cycle'} >Study cycle</NavLink>
          </div>
          <div>
            <NavLink href={'/flex-cards'}>Flash Cards</NavLink>
          </div>
        </nav>
        <ResponsiveMenu display={display} setDisplay={setDisplay}/>
      </Header>
      <Main>
        <Title>Dashboard</Title>
        <Cards/>
        <Statistics StudyCycle={StudyCycle}/>
      </Main>
    </>
  );
}
