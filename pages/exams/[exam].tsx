import { useRouter } from "next/router";
import { Button, Container, Footer, Header, Main, Title } from "../../components/sharedstyles";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import QuestionForm from "../../components/questionForm";
import Question from "../../components/question";

export default function ExamPage() {

  const router = useRouter();
  const { asPath } = router;
  const parts = asPath.split('/'); 

  const examName = parts[parts.length - 1];
  const { 'token': token } = parseCookies();
  const [request, setRequest] = useState(false);
  const [userAuth , setUserAuth] = useState(true)
  const [questionList, setList] = useState([])
  const[updateList, setUpdateList] = useState(false)
  const [question, setQuestion] = useState(false)
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

  if (request === false) {
    axios
      .post("/api/exams/getQuestions", {
        title: examName,
        token,
      })
      .then((res) => {
        setList(res.data.exam.questions)
        setRequest(true);
      })
      .catch((err) => {
        setRequest(true);
      });
  }
  useEffect(()=>{
        
    if (updateList === false) {
      axios
        .post("/api/exams/getQuestions", {
          title: examName,
          token,
        })
        .then((res) => {
          setList(res.data.exam.questions)
          setUpdateList(true);
        })
        .catch((err) => {
          setUpdateList(true);
        });
    }
  },[updateList])
  const [form, setForm] = useState(false)
  return (
    <>
    <Header>
      <nav>
        <Link href={'/dashboard'} > Dashboard</Link>
        <Link href={'/exams'}>Exams</Link>
        <Link href={'/study-cycle'}>Study Cycle</Link>
      </nav>
    </Header>
    <Main>
      <Title>Create and practice with custom exam questions: {examName}.</Title>
      {form === true &&
        <QuestionForm examName={examName} token={token} setForm={setForm} setQuestion={setQuestion} question={question} updateList={updateList} setUpdateList={setUpdateList} />
      }
      {
        form === false && question === false &&
        <Button onClick={(e)=>{
          e.preventDefault()
          setForm(true)
        }}>Create questions</Button>
      }
      {
        question === false && form === false && questionList.length > 0 &&
        <Button onClick={(e)=>{
          e.preventDefault()
          setQuestion(true)
        }}>Start exam</Button>
      }
      {
        question === true &&   form === false && 
          <Question token={token} examName={examName} setQuestion={setQuestion}  />
      }
    </Main>
    <Footer>
      <Link href={'/register'}>Create your account</Link>
    </Footer>
  </>
  )
}