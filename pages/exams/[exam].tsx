import { useRouter } from "next/router";
import ResponsiveMenu, { Button, Header, Main, Title } from "../../components/sharedstyles";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import QuestionForm from "../../components/questionForm";
import Question from "../../components/question";
import SubjectCards from "../../components/subjectsCards";

export default function ExamPage() {

  const router = useRouter();
  const { asPath } = router;
  const parts = asPath.split('/'); 

  const examName = parts[parts.length - 1];
  const { 'token': token } = parseCookies();
  const [request, setRequest] = useState(false);
  const [userAuth , setUserAuth] = useState(true)
  const [questionList, setList] = useState([])
  const [clickCard, setClickCard] = useState(false)
  const [questionSubjectList, setQuestionSubjectList] = useState([])
  const[updateList, setUpdateList] = useState(false)
  const [question, setQuestion] = useState(false)
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

  useEffect(()=>{
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
          router.push("/exams");
          setRequest(true);
        });
    }
  },[request])
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
    <Header display={display} >
      <img src="../logo-lotudy-removebg.png" alt="logo da lotudy" />
      <nav>
        <div>
          <Link href={'/dashboard'} > Dashboard</Link>
        </div>
        <div>
          <Link href={'/exams'}>Exams</Link>
        </div>
        <div>
          <Link href={'/study-cycle'}>Study Cycle</Link>
        </div>
        <div>
          <Link href={'/flex-cards'}>Flash Cards</Link>
        </div>
      </nav>
      <ResponsiveMenu display={display} setDisplay={setDisplay}/>
    </Header>
    <Main>
      <Title>Create and practice with custom exam questions: {examName}.</Title>
      {form === true &&
        <QuestionForm questionList={questionList} examName={examName} token={token} setForm={setForm} setQuestion={setQuestion} question={question} updateList={updateList} setUpdateList={setUpdateList} />
      }
      {
        question === false && form === false && questionList.length > 0 &&
        <SubjectCards subjects={questionList} setQuestion={setQuestion} setClickCard={setClickCard} setQuestionSubjectList={setQuestionSubjectList}  />
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
          <Question token={token} examName={examName} setQuestion={setQuestion} questionList={(clickCard === true ? questionSubjectList : questionList)} clickCard={clickCard} setClickCard={setClickCard}  />
      }
    </Main>
  </>
  )
}