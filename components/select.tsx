import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, colorSegundary } from './sharedstyles'
import validator from 'validator'
import { useRouter } from 'next/router'

const CustomSelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 0 ){
    label{
        color: ${colorSegundary.sideColor};
        font-size:1rem;
        font-weight: 400;
    }
    input{
        width: 250px;
    }
};
@media screen and (min-width: 768px ){
    label{
        color: ${colorSegundary.sideColor};
        font-size:1.2rem;
        font-weight: 600;
    }
    input{
        width: 420px;
    }
};
@media screen and (min-width: 1024px) {
    input{
        width: 480px;
    }
}
`

const SelectedOption = styled.div`
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
`

const OptionsList = styled.ul`
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 'block' : 'none')};
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`

 interface Option {
  value: string
  label: string
}

function CustomSelect({ options, selectedOption, setSelectedOption, isOpen, setIsOpen, setMseError, mseError, access}) {

  const [newAddCategory, setNewAddCategory] = useState(false)
  const [newCategory,setNewCategory] = useState('')
  const router = useRouter()

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }
  return (
    <CustomSelectWrapper>
      {access === 'Gratuito'&&
        <>
          <label htmlFor="category">Veja outros planos para adicionar uma categoria à pergunta.</label>
          <Button  onClick={()=>{
            router.push('/plans')
          }} >Ver Planos</Button>
        </>
      }
      {newAddCategory === false && (access === 'Premium'|| access === 'Anual')&&(
        <>
          <label htmlFor="category">Adicione uma categoria da lista à pergunta.</label>
          <SelectedOption onClick={() => setIsOpen(!isOpen)}>
            {selectedOption ? selectedOption : 'Selecione uma opção'}
          </SelectedOption>
          
          <OptionsList isOpen={isOpen}>
            {options.map((option,index) => (
              <OptionItem key={index} onClick={() => {
                handleOptionClick(option.subject)
              }}>
                {option.subject}
              </OptionItem>
            ))}
            <Button onClick={(e)=>{
              e.preventDefault() 
              setNewAddCategory(true)
            }} >nova categoria</Button>
          </OptionsList>
        </>
      )}
      {newAddCategory === true && (access === 'Premium'|| access === 'Anual')&&(
        <>
          <label htmlFor="newCategory">nova categoria</label>
          <input type="text" value={newCategory} minLength={1} maxLength={30} onChange={(e)=>{
            setNewCategory(e.target.value)
          }} onBlur={()=>{
            if (validator.isAlpha(newCategory,  'pt-PT') == false) {
              setMseError('a categoria deve ter apenas letras!')
            } else{
              setMseError('')
            }
          }} />
          {mseError !== ''&&
                <p>{mseError}</p>
            }
          <Button onClick={(e)=>{
            e.preventDefault()
            if (newCategory !== '') {
              options.push({subject: newCategory})
              setNewAddCategory(false)
            }
          }} >Crie Categoria</Button>
        </>
      )}
    </CustomSelectWrapper>
  )
}

export default CustomSelect
