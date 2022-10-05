import { useEditableControls } from "@chakra-ui/react";
import { IconButton, Flex, Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import { CloseIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { changeDataProfile } from "../../redux/action";
import { useState } from "react";
import { useDispatch } from "react-redux";



const EditableForm = ({ val, input, setInput, name, email, validate, setErrors }) => {

  const dispatch = useDispatch()
  // const [errors,setErrors]=useState({})

  // const validate = (input) => {
  //   let errores = {};
  //   if (input.firstName) {
  //     if (input.firstName === '') {
  //       errores.firstName = 'Please enter your name';
  //     } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.firstName)) {
  //       errores.firstName = 'The name can only contain letters and spaces';
  //     }
  //   }
  //   return errores;
  // }

  const handleChange = (e) => {
    setInput({ [e.target.name]: e.target.value })
  }
  const handleCheck = () => {
    dispatch(changeDataProfile(input, email))
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
      justifyContent={'baseline'}
      w={'20vh'}
      onSubmit={() => { handleCheck() }}
    >
      <Flex
        dir="row"
        w={'100%'}
        justifyContent={'space-evenly'}
      >
        <EditablePreview color={'gray.500'} fontStyle={'italic'} />
        <EditableInput onChange={(e) => { handleChange(e) }} name={name} size={'SM'} />
        <EditableControls />
      </Flex>

    </Editable>
  )
}

export default EditableForm