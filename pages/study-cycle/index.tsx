import Link from "next/link";
import ResponsiveMenu, { Button, Description, Footer, Header, Main, Title } from "../../components/sharedstyles";
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
  const [display, setDisplay] = useState('none');
  
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
        <Header display={display} >
          <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
          <nav>
              <div>
                <Link href={'/dashboard'} > Dashboard</Link>
              </div>
              <div>
                <Link href={'/exams'}>Exams</Link>
              </div>
              <div>
                <Link href={'/flex-cards'}>Flash Cards</Link>
              </div>
          </nav>
          <ResponsiveMenu display={display} setDisplay={setDisplay}/>
        </Header>
        <Main>
          <Title>Create a study cycle</Title>
          { form === false && StudyCycle.length > 0 &&
            <UserStudyCycle StudyCycle={StudyCycle} token={token} />
          }
          {
              form === true && StudyCycle.length == 0 &&
              <>
                <FormStydyCycle    setForm={setForm} token={token}/>
                <Description>
                  <p>O ciclo de estudos é uma técnica de estudo para melhoria da aprendizagem e gestão do tempo. É muito utilizada por aprovados em concursos difíceis e pode ser utilizado para qualquer tipo de prova ou estudo, sendo quase obrigatório para quem pretenda estudar com alto desempenho.</p>
                  <br />
                  <p>O método de ciclo de estudos considera a sequência de disciplinas que devem ser estudadas em uma ordem determinada anteriormente, independentemente do dia ou horário que você vá estudar. Nesse caso, caso você não consiga terminar uma matéria por algum motivo, será possível recomeçar os estudos a partir de onde parou no ciclo.</p>
                  <br />
                  <p>Um dos benefícios do ciclo de estudos é que ele permite uma maior flexibilidade no seu plano de estudo e adapta-se a imprevistos e a sua rotina. Além disso, ele ajuda a ter uma visão real do tempo disponível de estudo, dá a importância correta de tempo para cada matéria e leva em consideração apenas o tempo líquido de estudo. Isso pode tornar suas horas dedicadas ao aprendizado muito mais produtivas.</p>  
                </Description>
              </>
          }
          {
              form === false && StudyCycle.length == 0 &&
              <div>
                <Button onClick={(e)=>{
                  e.preventDefault()
                  setForm(true)

              }}>Create Study Cycle </Button>
              
              </div>
          }
          
        </Main>
        <Footer>
          <Link href={'/register'}>Create an Account</Link>
        </Footer>
        </>
    )
}