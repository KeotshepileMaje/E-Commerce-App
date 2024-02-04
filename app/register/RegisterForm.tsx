'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
    };

    return (
        <>
            <Heading title='Sign up for E shop' />
            <Button 
                outline
                label='Sign up with Gogle'
                icon={AiOutlineGoogle}
                onClick={() => {}}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='email'
                label='email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='email'
            />
            <Input
                id='password'
                label='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='password'
            />
            <Button 
                label={isLoading ? 'Loading' : 'Sign-up'}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                Already have an account?{" "}
                <Link className='underline' href='/login'> Log in</Link>
            </p>
        </>
    );
};

export default RegisterForm;