import Link from "next/link";
import { Header, Title, Footer, Main } from "../../components/sharedstyles";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import ListExams from "../../components/listExams";
import FormExams from "../../components/formExams";


export default function exams() {
    const { 'token': token } = parseCookies();
    const [examList, setExamList] = useState([]);
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
            .then(()=> {setUserAuth(true)})
            .catch(()=>{setUserAuth(false)})
        } catch (error) {
            setUserAuth(false)
        }
        }
    },[token])
    if (userAuth === false) {
        router.push("/login");
    }
    
    const [ formUpdate, setFormUpdate ] = useState(false)

    useEffect(() => {
        const fetchExams = async () => {
        try {
          const response = await axios.post('/api/exams/getExams', {
            token,
          });
          setExamList(response.data.list);
        } catch (error) {
          console.log(error);
        }
      };
    
      const fetchExamsAndUpdateList = async () => {
        if (token) {
          await fetchExams();
        }
      };
    
      fetchExamsAndUpdateList();
      setFormUpdate(false)
      }, [token,formUpdate === true]);
    return(
        <>
            <Header>
                <nav>
                    <Link href={'/dashboard'}>Dashboard</Link>
                    <Link href={'/study-cycle'}>Study Cycle</Link>
                    <Link href={'/flex-cards'}>Flash Cards</Link>
                </nav>
            </Header>
            <Main>
                <Title>Create exams and study however you want.</Title>
                <ListExams formUpdate={formUpdate} setFormUpdate={setFormUpdate} examList={examList} setExamList={setExamList}/>
                <FormExams formUpdate={formUpdate} setFormUpdate={setFormUpdate} examList={examList}/>
            </Main>
            <Footer>
                <Link href={'/register'}>Create your account</Link>
            </Footer>
        </>
    )
}