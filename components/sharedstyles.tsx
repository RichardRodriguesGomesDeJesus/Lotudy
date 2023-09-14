import styled from 'styled-components'

export const colorSegundary = {
  principalColor: "#B83388",
  sideColor: "#431861",
  titleColor: "#EB5A7D",
  backgrondColor: "#F5F7F7",
  white: "#fff",
  textColor:"#767675",
  error:"#F91364"
}

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
  padding: 0 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
`
const Main = styled.main`
  color: ${colorSegundary.textColor};
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width:100vw;
`
const Menu = styled.div<Props>`
  cursor: pointer;
  div {
    width: 32px;
    height: 2px;
    background: #fff;
    margin: 8px;
    transition: 0.3s;
  }

  @media screen and (max-width: 768px ){
    display: block;
  };
  @media screen and (min-width: 769px ){
    display: none;
  };
  .line1 {
    ${(props => props.display == 'flex' ? 'transform: rotate(-45deg) translate(-8px, 8px);': '')}
  }
  
  .line2 {
    ${(props => props.display == 'flex' ? 'opacity: 0;': '')}

  }
  
  .line3 {
    ${(props => props.display == 'flex' ? 'transform: rotate(45deg) translate(-5px, -7px);': '')}
    
  }

`
export default function ResponsiveMenu({display, setDisplay}){
  return(
    <Menu display={display} onClick={()=>{
      if(display == 'none'){
        setDisplay('flex')
      } else {
        setDisplay('none')
      }
    }}>
      <div className='line1'></div>
      <div className='line2'></div>
      <div className='line3'></div>
    </Menu>
  )
}
interface Props {
  display: string
}

const Header = styled.header<Props>`
  background: ${colorSegundary.principalColor} ;
  display: flex;
  min-height: 5rem;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100vw;
  img{
    width: 48px;
    margin: 0 8px;
  }
  nav{
    align-items: center;
    color: #fff;
    display: flex;
    gap: 1rem;
    font-weight: 400;
    width: 100%;
    div{
      display:flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      height: 100%;
      &:hover,
      :focus,
      :active {
          a{
            cursor: pointer;
            border-bottom: 3px  ${colorSegundary.white} solid;
          }
      }
    }
  }
  @media screen and (max-width: 768px ){
    nav{
      display : ${(Props => Props.display || 'none' )};
      position: absolute;
      top: 8vh;
      right: 0;
      width: 50vw;
      height: 92vh;
      background: ${colorSegundary.principalColor};
      flex-direction: column;
      align-items: center;
      text-align:center;
      justify-content: space-around;
      transition: transform 0.3s ease-in;
      margin: 0 ;
      div{
        width:100%;
      }
    }
  };
  @media screen and (min-width: 1024px  ){
    nav{
      display: flex;
      flex-direction: row;
      margin: 0 1rem;
    }
  };
`
const Title = styled.h1`
  color: ${colorSegundary.titleColor};
  font-weight: 600;
  text-align:center;
  @media screen and (min-width: 0 ){
    font-size: 1.25rem;
  };
  @media screen and (min-width: 768px ){
    font-size: 1.5rem;
  
  };
  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  };
` 
const Description = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin:0;
  background: ${colorSegundary.white};
  font-weight: 400;
  width:100vw;
  @media screen and (min-width: 0 ){
    font-size: 1rem;
    padding: 1rem;
  };
  @media screen and (min-width: 768px ){
    font-size: 1.25rem;
    padding: 2rem;
  };
  @media screen and (min-width: 1024px) {
    padding: 3rem;
  };
`
const Footer = styled.footer`
  color: ${colorSegundary.white};
  justify-content: center;
  align-items: center;
  background: ${colorSegundary.sideColor};
  gap: 1rem;
  font-weight: 400;
  display: flex;
  height: 80px;
  text-align: center;
  width: 100vw;
`
const Button = styled.button`
  background: linear-gradient( 135deg,  ${colorSegundary.sideColor} , ${colorSegundary.titleColor});
  border: none;
  border-radius: .5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.white};
  margin: 1rem auto;
  padding: .5rem;
  &:hover,
  :focus,
  :active {
      cursor: pointer;
      color: ${colorSegundary.sideColor};
      background: ${colorSegundary.white};
      border: 1px solid ${colorSegundary.sideColor};
      border-color: ${colorSegundary.sideColor};
      padding: calc(.5rem - 1px) 0;
  }
  @media screen and (min-width: 0 ){
      width: 150px;
  }
  @media screen and (min-width: 768px ){
      width: 175px;
  }
  @media screen and (min-width: 1024px){
      width: 200px;
  }
`

const ButtonInvalid = styled.div`
  background: ${colorSegundary.white};
  border: 1px solid ${colorSegundary.principalColor};
  border-radius: .5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.principalColor};
  display: flex;
  font-size: 12.5px;
  justify-content: center;
  margin: 1rem auto;
  padding: .5rem;
  &:hover,
  :focus,
  :active {
      cursor: not-allowed;
  }
  @media screen and (min-width: 0 ){
      width: 150px;
  }
  @media screen and (min-width: 768px ){
      width: 175px;
  }
  @media screen and (min-width: 1024px){
      width: 200px;
  }
`
const ButtonClose = styled.button`
  background: transparent;
  border: none;
  border-radius: .5rem;
  color: ${colorSegundary.white};
  display:flex;
  justify-content: flex-end;
  height: 30px;
  margin: 0 0 0 90%;
  padding: .125rem;
  width: 30px;
  &:hover,
  :focus,
  :active {
      cursor: pointer;
      color: ${colorSegundary.sideColor};
      border-color: ${colorSegundary.sideColor};
      padding: calc(.125rem -1px);
  }
  img{
    height: 100%;
    width: auto;
  }
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-flow: row wrap;
  width: 80%;
  margin: 1rem;

  @media (max-width: 768px) {
    height: auto;
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
  border: 1px solid black;
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
    border-color: ${colorSegundary.titleColor};
  }
  @media screen and (min-width: 0 ){
    height:150px;
    width: 150px;
    img{
      height: 75px;  
      width:  75px ;
    }
    p{
      font-size: .85rem;
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
const IconPremiumContainer = styled.span`
  display: flex;
  height:40px;
  width:40px;
  img{
    width:100%;
  }
`
function IconPremium() {
  return(
    <IconPremiumContainer>
      <img src="premium-icon-removebg.png" />
    </IconPremiumContainer>
  )
}

export { Container, Main, Header, Title, Description, Footer, Button, ButtonClose, FlexContainer, Card, IconPremium, ButtonInvalid}
