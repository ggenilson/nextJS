import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import axios from 'axios';
import { User } from '../../../api/User';

export type UserProps = {
  user?: User | null;
}

function Profile({ user }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  console.log('Fallback: ', router.isFallback);

  if (router.isFallback) {
    return <h5>Carregando...</h5>;
  }

  return (
    <div>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
    { params: { id: context.params.id } }
  );

  const user = response.data[0];

  //   await new Promise(res => setTimeout(res, 4000));

  return {
    props: { user, revalidate: 10 },
  };
}

// export async function getStaticProps(context) {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users',
//     { params: { id: context.params.id } }
//   );

//   const user = response.data[0];

//   //   await new Promise(res => setTimeout(res, 4000));

//   return {
//     props: { user, revalidate: 10 },
//   };
// }

export const getStaticPaths: GetStaticPaths = async (context) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  const users = response.data.slice(0, 5);

  const paths = users.map(({ id }) => {
    return {
      params: { id: String(id) },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default Profile;
