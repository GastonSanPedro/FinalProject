import { Input, Flex, useEditableControls, ButtonGroup, IconButton, Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import { CloseIcon,EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { changeDataProfile } from "../../redux/action";

function EditableForm({val, input, setInput, name, email}) {
  
  const dispatch = useDispatch()
  const handleCheckButton = () => {dispatch(changeDataProfile(input, email))}
  const handleChangeInput = (e) => {setInput({[e.target.name] : e.target.value})}
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton bg={'none'} icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton bg={'none'} icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton bg={'none'} size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }
  return (
    <Editable
      textAlign='center'
      defaultValue={val === '' ? 'Write a bit about your self' : val }
      fontSize='md'
      isPreviewFocusable={false}
      onSubmit={()=>{handleCheckButton()}}
      w={'100%'}
      h={'100%'}
    >
      <EditablePreview color={'gray.500'} fontStyle={'italic'} />
      <Input name={name} as={EditableInput} onChange={(e)=>{handleChangeInput(e)}} />
      <EditableControls />
    </Editable>
  )
}

const UserBio = ({myUser, input, setInput}) => {
  const {bio, email} = myUser
  return(
    <>
      <Flex 
          flexDir="column"  
          ml={'10%'} 
          mt={'2%'}
          justify={'center'} 
          w={'105vh'}>
              <Flex 
              borderRadius={2} 
              align={'center'}>
                  <Flex   
                  m={'2% 0% 2% 2%'} 
                  p={'1% 1% 1% 2%'} 
                  align={'center'} 
                  justify={'space-between'} 
                  w={'100%'} 
                  bg={'white'} >
                    <EditableForm 
                    val={bio}
                    name={'bio'} 
                    email={email} 
                    input={input} 
                    setInput={setInput}/>
                  </Flex>
              </Flex>
      </Flex>        
    </>
  )
}

export default UserBio