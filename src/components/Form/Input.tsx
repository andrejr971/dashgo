import { FormControl, FormErrorMessage, FormLabel, Input as FormInput, InputProps as ChackraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldErrors } from "react-hook-form";


interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  type: string;
  error?: FieldErrors;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref ) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={name}>
          {label}
        </FormLabel>
      )}

      <FormInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ 
          bgColor: 'gray.900'
        }}
        size="lg"
        {...rest}
        ref={ref}
      />

      {!!error && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase);