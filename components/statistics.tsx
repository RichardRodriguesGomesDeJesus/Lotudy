import styled from "styled-components";
import PieChart from "./pieChart";
import { Button, colorSegundary } from "./sharedstyles";
import { useRouter } from "next/router";

const StatisticsContainer = styled.div`
  background: ${colorSegundary.white} ;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-grow: 1;
  width: 100%;
  div{
    display: flex;
    flex-direction: row;
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
export default function Statistics({ StudyCycle }) {
  const router = useRouter()

  return (
    <StatisticsContainer>
      {StudyCycle.length > 0 &&
        <div>
          <div>
            <p>Este gráfico mostra as suas horas estudadas durante o seu ciclo de estudos.</p>

            <p>Um ciclo de estudos é uma estratégia eficaz para organizar e otimizar o tempo dedicado ao aprendizado. Ele oferece uma série de benefícios e vantagens.</p>
            
          </div>
          <PieChart StudyCycle={StudyCycle} />
       </div>
      }
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
