import React from 'react';
import { userOut } from '../../interface/user.interface';
import Spinner from '../Spinner';
import { Transition } from "@headlessui/react";
import User from '../User';

interface Props {
    users: Array<userOut>;
    loading: boolean;
    fetchUsers: () => void
}

const Users = (props: Props) => {
    return (
        <div className='mt-4'>
            <div className='w-full bg-gray-300 p-2'>
                Users
            </div>
            {
                props.loading ? (
                    <Spinner className="text-6xl mx-auto mt-16"/>
                ) : props.users?.length === 0 ? (
                    <div className='flex items-center justify-center mt-4'>
                        <p>No User created</p>
                    </div>
                ) : (
                    props.users?.map((user, index)=> {
                        return (
                            <Transition
                                appear
                                as="div"
                                show={true}
                                key={user._id}
                                style={{ transitionDelay: `${100 * index}ms`}}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 translate-y-10"
                                enterTo="transform opacity-100 translate-y-0"
                            >
                                <User user={user} fetchUsers={props.fetchUsers}/>
                            </Transition>
                        )
                    })
                )
            }
        </div>
    )
}

export default Users;