// import { useRouter } from 'next/router';
import axios from 'axios';

function Profile({ user = {} }) {
  //   const { query } = useRouter();

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

  return {
    props: { user },
  };
}

export async function getStaticPaths() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  const users = response.data;

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
