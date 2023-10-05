import styled from "styled-components"
import { colorSegundary } from "./sharedstyles"
import flexCards from "../pages/flex-cards"

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-flow: row wrap;
  margin: 1rem;
  justify-content: space-around ;
  @media screen and (min-width: 0) {
    height: auto;
    width: 250px;
  }
  @media screen and (min-width: 768px) {
    height: auto;
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    height: auto;
    width: 800px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${colorSegundary.white};
  text-align: center;
  padding: 0;
  color: inherit;
  text-decoration: none;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  p{
    font-weight: 400;
    margin: 0;
  }
  &:hover,
  :focus,
  :active {
    cursor: pointer;
    color: ${colorSegundary.principalColor};
  }
  @media screen and (min-width: 0 ){
    height:200px;
    width: 200px;
    img{
      height: 100px;  
      width: 100px ;
    }
    p{
      font-size: 1rem;
    }
  };
  @media screen and (min-width: 768px ){
    height:200px;
    width: 200px;
    img{
      height: 100px;  
      width: 100px ;
    }
    p{
      font-size: 1rem;
    }
  };
  @media screen and (min-width: 1024px) {
    height:250px;
    width: 250px;
    img{
      height: 150px;  
      width: 150px;
    }
  };
`;

export default function SubjectCards({subjects, setQuestion, setClickCard, setQuestionSubjectList}){
  const uniqueSubjects = [...new Set(subjects.filter((e)=>{ if (e.subject) {
    return e
  }}).map(e => e.subject))];
  return(
    <FlexContainer>
      {uniqueSubjects.map((subject , index)=>(
        <Card key={index} onClick={()=>{
          setQuestionSubjectList(subjects.filter((e)=>e.subject === subject))
          setClickCard(true)
          setQuestion(true)
        }} >
          <h3>{subject as string}</h3>
        </Card>
      ))}
    </FlexContainer>
  )
}
