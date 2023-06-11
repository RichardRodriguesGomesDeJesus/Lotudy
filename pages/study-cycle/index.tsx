import Link from "next/link";
import { Button, Footer, Header, Main, Title } from "../../components/sharedstyles";
import FormStydyCycle from "../../components/formStudyCycle";
import { useEffect, useState } from "react";
import UserStudyCycle from "../../components/studyCycle";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import axios from "axios";
import studyCycle from "../../utils/interfaces";
export default function studyCyclePage() {
  const [form, setForm] = useState(false)
  const [StudyCycle , setStudyCycle] = useState<studyCycle[]>([])
  const { 'token': token } = parseCookies();
  const [userAuth , setUserAuth] = useState(true)
  const router = useRouter();
  
  useEffect(() => {
    const fetchStudyCycle = async () => {
      try {
        const response = await axios.post('/api/study-cycle/get-study-cycle',{
          token,
        })
        if (response.data.StudyCycle.subjects === undefined ) {
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
    setForm(false)
    }, [token]);
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
  return(
        <>
        <Header>
            <nav>
                <Link href={'/dashboard'} > Dashboard</Link>
                <Link href={'/exams'}>Simulados</Link>
            </nav>
        </Header>
        <Main>
            <Title>Crie um ciclo de estudos</Title>
            { form === false && StudyCycle.length > 0 &&
                <UserStudyCycle StudyCycle={StudyCycle} token={token} />
            }
            {
                form === true && StudyCycle.length == 0 &&
                <FormStydyCycle    setForm={setForm} token={token}/>
            }
            {
                form === false && StudyCycle.length == 0 &&
                <Button onClick={(e)=>{
                    e.preventDefault()
                    setForm(true)

                }}>Criar Cyclo  de Estudos </Button>
            }
        </Main>
        <Footer>
            <Link href={'/register'}>Crie sua conta</Link>
        </Footer>
        </>
    )
}