import { useRouter } from 'next/router';
import axios from 'axios';

function Profile({ user = {} }) {
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

export async function getStaticProps(context) {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
    { params: { id: context.params.id } }
  );

  const user = response.data[0];

  await new Promise(res => setTimeout(res, 4000));

  return {
    props: { user },
  };
}

export async function getStaticPaths() {
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
