import { useEditableControls } from "@chakra-ui/react"
import { IconButton, Flex, Editable, EditablePreview, Input, EditableInput } from "@chakra-ui/react"
import { CloseIcon,EditIcon, CheckIcon } from "@chakra-ui/icons"
import { changeDataProfile } from "../../redux/action"
import { useDispatch } from "react-redux"


const EditableForm = ({val, input, setInput, name, email}) => {

  const dispatch = useDispatch()
  
  const handleCheckButton = () => {dispatch(changeDataProfile(input, email ))}
  const handleChangeInput = (e) => {setInput({[e.target.name] : e.target.value})}

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
          size='xs' 
          bg={'none'} 
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
      justifyContent={'baseline'}
      onSubmit={()=>{handleCheckButton()}}
      w={'20vh'}
    >
      <Flex
      dir="row"
      w={'100%'}
      justifyContent={'space-evenly'}
      >
      <EditablePreview color={'gray.500'} fontStyle={'italic'} />
      <EditableInput name={name} onChange={(e) => handleChangeInput(e)} size={'SM'} />
      <EditableControls />
      </Flex>

    </Editable>
  )
}

export default EditableForm