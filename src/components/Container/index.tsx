import React, { useEffect, useState } from 'react';
import Form from '../Form'
import Users from '../Users'
import usersService from 'src/config/user.service';
import { userOut } from '../../interface/user.interface';

const Container = () => {
    const [users, setUsers] = useState<Array<userOut>>([])
    const [loading, setLoading] = useState(false);

    //fetch users
    async function fetchUsers() {
      try {
        setLoading(true)
        const { data } = await usersService.getAll();
        setUsers(data.data);
      } catch (error: any) {
        if (error) throw new Error(error.message);
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchUsers();
    //eslint-disable-next-line
    }, [])


  return (
    <div className='flex flex-col'>
       <Form fetchUsers={fetchUsers}/>
       <Users users={users} loading={loading} fetchUsers={fetchUsers}/>
    </div>
  );
}

export default Container;
