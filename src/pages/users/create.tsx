import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from 'react-query';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { client } from "../../services/queryClient";
import { useRouter } from "next/router";

type ICreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: Yup.string().oneOf([null, Yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: ICreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      client.invalidateQueries('users')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<ICreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push('/users');
  }


  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" label="Nome completo" type="text" error={errors.name} {...register('name')} />
              <Input name="email" label="E-mail" type="email" error={errors.email} {...register('email')} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
              <Input name="password_confirmation" type="password" label="Confirmação da Senha" error={errors.password_confirmation} {...register('password_confirmation')} />
            </SimpleGrid>

          </VStack>
          <Flex
            mt="8"
            justify="flex-end"
            >
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button 
                  as="a"
                  colorScheme="whiteAlpha"
                  >
                  Cancelar
                </Button>
              </Link>
              <Button 
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>

      </Flex>
    </Box>
  );
}