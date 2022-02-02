import React from 'react';
import usersService from 'src/config/user.service';
import toast from 'react-hot-toast';
import { userOut } from '../../interface/user.interface';

interface Props {
    user: userOut;
    fetchUsers:() => void
}
const User = (props: Props) => {
   
    //delete user
    async function deleteUser(username: any) {
        try {
            await usersService.deleteUser(username);
            toast.success('user successfully deleted');
            //fetch users
            props.fetchUsers()
        } catch (error: any) {
            if (error) throw new Error(error.message);
            toast.success('user not deleted');
        }
    }

    return (
        <div className='mt-4'>
                <div className='w-full grid-wrapper px-4 mt-4 border-b-2 border-gray-100'>
                    <div className='mb-2 grid-left'>
                        <div className='bg-primary rounded-full p-2 text-white'>
                            {props.user.name_prefix}
                        </div>
                        <div className='mt-3 md:mt-0'>
                            {props.user.username}
                        </div>
                        <div className='mt-3 md:mt-0'>
                            {props.user.first_name} {props.user.last_name}
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col md:flex-row justify-around items-center ml-auto'>
                        <div>
                            {props.user.date_of_birth}
                        </div>
                        <div>
                            <i onClick={() => deleteUser(props.user.username)} className='far fa-trash ml-3 text-red-500 cursor-pointer'></i>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default User;