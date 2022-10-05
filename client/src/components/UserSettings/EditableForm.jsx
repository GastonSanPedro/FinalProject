import { useEditableControls } from "@chakra-ui/react";
import { IconButton, Flex, Editable, EditablePreview, EditableInput, Text } from "@chakra-ui/react";
import { CloseIcon,EditIcon, CheckIcon } from "@chakra-ui/icons";
import { changeDataProfile } from "../../redux/action";
import { useState } from "react";
import { useDispatch } from "react-redux";



const EditableForm = ({val, input, setInput, name, email, usernames}) => {
  console.log(usernames)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const validate = (input) => {
      let errores = {};
                if(input.firstName === '' ) {
                errores.firstName = 'Please enter your name';
                } else if ( !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.firstName)) {
                errores.firstName = 'The name can only contain letters and spaces';
              }
              if (input.lastName === '') {
                errores.lastName = 'Please enter your last name';
                } else if ( !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
                errores.lastName = 'The last name can only contain letters and spaces';
                }
              if (input.userName === '') {
                errores.userName = 'Please create an username';
                } else if (usernames?.includes(input.userName)) {
                errores.userName = 'Username in use, please create another one';
                }
              if(input.password){
                if (input.password === '') {
                errores.password = 'Please create a password';
                } else if (input.password.length < 6) {
                errores.password = 'Password must be longer than 6 characters';
               }}
              
             return errores}
             
  const handleChange = (e) => {
    setErrors(validate({[e.target.name] : e.target.value}))
    setInput({[e.target.name] : e.target.value})
    
  }

  const handleCheck = () => {
    console.log({input},'editablef')
    if(Object.entries(errors).length == 0){
    return dispatch(changeDataProfile(input, email))}
  }

  function EditableControls() {
    const {
      isEditing,
      getCancelButtonProps,
      getEditButtonProps,
      getSubmitButtonProps
    } = useEditableControls()

    return isEditing ? (
        <Flex align={'center'}>
        <IconButton 
          isDisabled={true}
          size='xs' 
          bg={'none'}
          name={'check'}
          icon={<CheckIcon />}
          
          {...getSubmitButtonProps()} 
           />
        <IconButton 
          size='xs' 
          bg={'none'} 
          icon={<CloseIcon />} 
          {...getCancelButtonProps()} />
        </Flex>
    ) : (
      <Flex justifyContent='center'>
        <IconButton 
        size='sm' 
        bg={'none'} 
        icon={<EditIcon />} 
        {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign='center'
      defaultValue={val}
      fontSize='md'
      isPreviewFocusable={false}
      w={'30vh'}
      onSubmit={()=>{handleCheck()}}
    >
      <Flex
      dir="row"
      w={'100%'}
      justify={'end'}
      >
      <EditablePreview color={'gray.500'} fontStyle={'italic'} />
      <EditableInput onChange={(e)=>{handleChange(e)}} name={name} size={'SM'} />

      <EditableControls />

      </Flex>
      {
        errors ?
        <Text fontSize={'xs'} color={'red'}>{errors[name]}</Text> : null
      }

    </Editable>
    
  )
}

export default EditableForm