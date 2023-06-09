import Link from "next/link";
import { Button, Footer, Header, Main, Title } from "../../components/sharedstyles";
import FormStydyCycle from "../../components/formStudyCycle";
import { useEffect, useState } from "react";
import UserStudyCycle from "../../components/studyCycle";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import axios from "axios";

export default function studyCyclePage() {
  const [form, setForm] = useState(false)
  interface studyCycle {
    name: string,
    difficultyLevel: string,
    levelHours: number,
    CompletedHours: number
  }
  const [StudyCycle , setStudyCycle] = useState<studyCycle[]>([])
  const { 'token': token } = parseCookies();
  const [userAuth , setUserAuth] = useState(true)
  const router = useRouter();
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
                <UserStudyCycle StudyCycle={StudyCycle} />
            }
            {
                form === true && StudyCycle.length == 0 &&
                <FormStydyCycle setStudyCycle={setStudyCycle} StudyCycle={StudyCycle} form={form} setForm={setForm}/>
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