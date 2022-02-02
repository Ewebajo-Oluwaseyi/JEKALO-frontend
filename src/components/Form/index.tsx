import React, { useState } from 'react';
import TextInput from '../TextInput';
import { Controller, useForm } from 'react-hook-form';
import { userIn } from '../../interface/user.interface';
import Spinner from '../Spinner';
import DateInput from '../DateInput';
import { format } from 'date-fns';
import usersService from 'src/config/user.service';
import toast from 'react-hot-toast';

interface Props {
    fetchUsers: () => void
}

const Form = (props: Props) => {
    const {register, handleSubmit, formState: {errors}, control} = useForm<userIn>() ; //react-hook-form
    const [isSubmit, setSubmit] = useState(false);

    //create a user
    async function createUser (values: userIn) {
        try {
            setSubmit(true);
            const date = format(new Date(values.date_of_birth), 'dd-MM-yyyy'); //format date
            const payload = {
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                date_of_birth: date
            }
            await usersService.createUser(payload);
            //fetch user
            props.fetchUsers();
            toast.success('user created successfully');
        } catch (error: any) {
            if (error) throw new Error(error.message);
            toast.error(error.message);
        } finally {
            setSubmit(false);
        }
    }


    return (
        <div className='mb-5'>
          <form onSubmit={handleSubmit(createUser)} className='formWrapper'>
           <div className='flex flex-wrap gap-6'>
               <div className='flex-grow'>
                  <TextInput
                      id="first_name"
                      label="First name"
                      placeholder="First name"
                      isInValid={!!errors.first_name}
                      validationMessage={errors.first_name?.message}
                      {...register('first_name', {
                          required: 'Name is required'
                      })}
                      required
                  />
               </div>
               <div className='flex-grow'>
                  <TextInput
                      id="last_name"
                      label="Last name"
                      placeholder="FirstLast name"
                      isInValid={!!errors.last_name}
                      validationMessage={errors.last_name?.message}
                      {...register('last_name', {
                          required: 'Name is required'
                      })}
                      required
                  />
               </div>
               <div className='flex-grow'>
                  <TextInput
                      id="username"
                      label="Username"
                      placeholder="Username"
                      isInValid={!!errors.username}
                      validationMessage={errors.username?.message}
                      {...register('username', {
                          required: 'Name is required'
                      })}
                      required
                  />
               </div>
               <div className='flex-grow'>
                   <Controller
                    name="date_of_birth"
                    control={control}
                    render={({field}) => (
                        <DateInput
                           id="date_of_birth"
                           label="Date of Birth"
                           field={field}
                        />
                    )}
                    rules={{ required: true }}
                    />
               </div>
           </div>
           <div>
               <button className='btn bg-primary w-full lg:w-10/12 mt-6' type="submit" disabled={isSubmit}>
                    {isSubmit ? <Spinner className="text-2xl"/> : 'SUBMIT'}
               </button>
           </div>
           </form>
        </div>
    )
}

export default Form;