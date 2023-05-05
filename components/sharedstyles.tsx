import styled from 'styled-components'

export const colors = {
  principal: "#16c1c8",
  segundaria: "#49cccc",
  terceira: "#7cd7cf",
  verdePrincipal:"#aee1d3",
  verdeSegundaria: "#e1ecd6"
}

const Container = styled.div`
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
  padding: 5rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  width:100vw;
`

const Header = styled.header`
  background: ${colors.principal} ;
  display: flex;
  height: 5rem;
  width: 100vw;
`
const Title = styled.h1`
  color: ${colors.segundaria};
  text-align:center;
` 
const Description = styled.p`

`
export { Container, Main, Header, Title, Description}
