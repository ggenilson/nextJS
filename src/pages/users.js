import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    const { data } = response;

    setUsers(data);
  };

  return <h1>Teste de Rota</h1>;
}
