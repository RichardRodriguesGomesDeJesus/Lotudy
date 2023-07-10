import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, colors } from './sharedstyles';

const CustomSelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 0 ){
    label{
        color: ${colors.sideColor};
        font-size:1rem;
        font-weight: 400;
    }
    input{
        width: 250px;
    }
};
@media screen and (min-width: 768px ){
    label{
        color: ${colors.sideColor};
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
`;

const SelectedOption = styled.div`
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const OptionsList = styled.ul`
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 'block' : 'none')};
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

 interface Option {
  value: string;
  label: string;
}

function CustomSelect({ options, selectedOption, setSelectedOption, isOpen, setIsOpen}) {

  const [newAddCategory, setNewAddCategory] = useState(false)
  const [newCategory,setNewCategory] = useState('')


  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <CustomSelectWrapper>
      {newAddCategory === false &&(
        <>
          <label htmlFor="category">Add a category from the list to the question.</label>
          <SelectedOption onClick={() => setIsOpen(!isOpen)}>
            {selectedOption ? selectedOption : 'Select an option'}
          </SelectedOption>
          
          <OptionsList isOpen={isOpen}>
            {options.map((option,index) => (
              <OptionItem key={index} onClick={() => {
                handleOptionClick(option)
              }}>
                {option}
              </OptionItem>
            ))}
            <Button onClick={(e)=>{
              e.preventDefault() 
              setNewAddCategory(true)
            }} >new category</Button>
          </OptionsList>
        </>
      )}
      {newAddCategory === true&&(
        <>
          <label htmlFor="newCategory">new category</label>
          <input type="text" value={newCategory} onChange={(e)=>{
            setNewCategory(e.target.value)
          }}  />
          <Button onClick={(e)=>{
            e.preventDefault()
            if (newCategory !== '') {
              options.push(newCategory)
              setNewAddCategory(false)
            }
          }} >Create Category</Button>
        </>
      )}
    </CustomSelectWrapper>
  );
};

export default CustomSelect;
