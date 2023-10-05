import { useRouter } from "next/router"
import ResponsiveMenu, { Button, Header, Main, Title } from "../../components/sharedstyles"
import Link from "next/link"
import axios from "axios"
import { parseCookies } from "nookies"
import { useState, useEffect } from "react"
import QuestionForm from "../../components/questionForm"
import Question from "../../components/question"
import SubjectCards from "../../components/subjectsCards"
import Questions from "../../components/questions"

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
  const [edit, setEdit] = useState(false)
  const [display, setDisplay] = useState('none');
  const [access, setAccess] = useState('Gratuito'||'Premium'||'Anual')
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
        axios.post('http://localhost:3000/api/subscriptionCheck',{
          token:token
        })
        .then((response)=>{
          const list = response.data
          setAccess(list)
        })
        .catch((err)=>{
          console.log(err)
        })
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
          <Link href={'/exams'}>Simulados</Link>
        </div>
        <div>
          <Link href={'/study-cycle'}>Ciclo de  estudos</Link>
        </div>
        <div>
          <Link href={'/flex-cards'}>Cards de revisão</Link>
        </div>
      </nav>
      <ResponsiveMenu display={display} setDisplay={setDisplay}/>
    </Header>
    <Main>
      <Title>Crie e pratique com perguntas de exame personalizadas: {examName}</Title>
      {form === true &&  edit === false && question === false &&
        <QuestionForm questionList={questionList} examName={examName} token={token} setForm={setForm} setQuestion={setQuestion} question={question} setUpdateList={setUpdateList} access={access} />
      }
      {
        question === false && form === false && questionList.length > 0 &&  edit === false &&
        <SubjectCards subjects={questionList} setQuestion={setQuestion} setClickCard={setClickCard} setQuestionSubjectList={setQuestionSubjectList}  />
      }
      {
        form === false && question === false && edit === false &&
        <Button onClick={(e)=>{
          e.preventDefault()
          setForm(true)
        }}>Crie questões</Button>
      }
      {
        question === false && form === false && questionList.length > 0 && edit === false &&
        <>
          <Button onClick={(e)=>{
            e.preventDefault()
            setQuestion(true)
          }}>Comece a revisão</Button>
          <Button onClick={(e)=>{
            e.preventDefault()
            setEdit(true)
          }}
          >Edite</Button>
        </>
      }
      {form === false && question === false && edit === true &&
        <Questions questionList={questionList} setEdit={setEdit} token={token} examName={examName}  />
      }
      {
        question === true &&   form === false &&  edit === false &&
          <Question token={token} examName={examName} setQuestion={setQuestion} questionList={(clickCard === true ? questionSubjectList : questionList)} clickCard={clickCard} setClickCard={setClickCard}  />
      }
    </Main>
  </>
  )
}