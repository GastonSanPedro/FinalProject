import { useEditableControls } from "@chakra-ui/react";
import { IconButton, Flex, Editable, EditablePreview, Input, EditableInput } from "@chakra-ui/react";
import { CloseIcon,EditIcon, CheckIcon } from "@chakra-ui/icons";
import { changeDataProfile } from "../../redux/action";
import { useDispatch} from "react-redux";
import { useState } from "react";



const EditableForm = ({val, input, setInput, name, email, users}) => {

  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(true)
  const handleCheckButton = (e) => { 
      setInput({[e.target.name] : e.target.value})}
   
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
      justifyContent={'baseline'}
      onSubmit={(e)=>{handleCheckButton(e)}}
      w={'20vh'}
    >
      <Flex
      dir="row"
      w={'100%'}
      justifyContent={'space-evenly'}
      >
      <EditablePreview color={'gray.500'} fontStyle={'italic'} />
      <EditableInput name={name} size={'SM'} />
      <EditableControls />
      </Flex>

    </Editable>
  )
}

export default EditableForm