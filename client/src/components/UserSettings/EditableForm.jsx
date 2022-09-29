import { useEditableControls } from "@chakra-ui/react"
import { ButtonGroup, IconButton, Flex, Editable, EditablePreview, Input, EditableInput, Box } from "@chakra-ui/react"
import { CloseIcon,EditIcon, CheckIcon } from "@chakra-ui/icons"


const EditableForm = ({value}) => {

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup
     >
        <Flex align={'center'}>
        <IconButton 
          size='xs' 
          bg={'none'} 
          icon={<CheckIcon />} 
          {...getSubmitButtonProps()} />
        <IconButton 
          size='xs' 
          bg={'none'} 
          icon={<CloseIcon />} 
          {...getCancelButtonProps()} />
        </Flex>
      </ButtonGroup>
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
      defaultValue={value}
      fontSize='md'
      isPreviewFocusable={false}
      
      justifyContent={'baseline'}
    >
      <Flex
      dir="row"
      w={'100%'}
      justifyContent={'space-evenly'}
      >
      <EditablePreview color={'gray.500'} fontStyle={'italic'} />
      <Input  size={'SM'} as={EditableInput} />
      <EditableControls />
      </Flex>

    </Editable>
  )
}

export default EditableForm