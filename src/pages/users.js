import { useState, useEffect } from 'react';
import axios from 'axios';

function Users({ users }) {
  //   const [users, setUsers] = useState([]);

  //   const fetchUsers = async () => {
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/users'
  //     );

  //     const { data } = response;

  //     setUsers(data);
  //   };

  //   console.log(users);

  //   useEffect(() => fetchUsers(), []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  const { data } = response;

  return {
    props: { users: data }, // will be passed to the page component as props
  };
}

export default Users;
