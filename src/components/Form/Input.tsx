import { FormControl, FormLabel, Input as FormInput, InputProps as ChackraInputProps } from "@chakra-ui/react";

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  type: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
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
      />
    </FormControl>
  )
}