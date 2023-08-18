import styled from "styled-components";
import StudyPieChart from "./StudyPieChart";
import { Button, colorSegundary } from "./sharedstyles";
import { useRouter } from "next/router";
import ExamsBarChart from "./examsBarChat";

const StatisticsContainer = styled.div`
  background: ${colorSegundary.white} ;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  flex-grow: 1;
  width: 100vw ;
  div{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    div{
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (min-width: 0){
    div{
      flex-direction: column;
    }
  };
  @media screen and (min-width: 768px ){
    div{
      flex-direction: column;
    }
  };
  @media screen and (min-width: 1024px  ){
    div{
      flex-direction: row;
    }
  };
`
export default function Statistics({ StudyCycle, examList}) {
  const router = useRouter()

  return (
    <StatisticsContainer>
      {examList.length > 0&&(
        <div>
          <div>
            <p>Este gráfico mostra as suas horas estudadas durante o seu ciclo de estudos.</p>

            <p>Um ciclo de estudos é uma estratégia eficaz para organizar e otimizar o tempo dedicado ao aprendizado. Ele oferece uma série de benefícios e vantagens.</p>
          </div>
          <ExamsBarChart examList={examList} />
        </div>
      )}
      {StudyCycle.length > 0 &&
        <div>
          <div>
            <p>Este gráfico mostra as suas horas estudadas durante o seu ciclo de estudos.</p>

            <p>Um ciclo de estudos é uma estratégia eficaz para organizar e otimizar o tempo dedicado ao aprendizado. Ele oferece uma série de benefícios e vantagens.</p>
            
          </div>
          <StudyPieChart StudyCycle={StudyCycle} />
       </div>
      }
      {examList.length <= 0 &&(
        <div>
          <div>
            <p>crie um simulado para ter acesso a mais informações.</p>
            <Button onClick={()=>{
              router.push('/exams')
            }} > Criar simulado</Button>
          </div>
        </div>
      )}
      {StudyCycle.length <= 0 &&(
        <div>
          <div>
            <p>crie um ciclo de estudos para ter acesso a mais informações.</p>
            <Button onClick={()=>{
              router.push('/study-cycle')
            }} >Criar ciclo</Button>
          </div>
        </div>
      )
      }
    </StatisticsContainer>
  );
}
