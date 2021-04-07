import { useRouter } from 'next/router';
import axios from 'axios';

function Profile() {
  const { query } = useRouter();

  return <h1>Profile {query.id}</h1>;
}

export async function getStaticProps({ params }) {
  console.log('params: ', params);

  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
    { params: { id: params.id } }
  );

  const user = response.data[0];

  return {
    props: { user },
  };
}

export default Profile;
