"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../../components/Heading";
import Input from "../../components/inputs/input";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //     setIsLoading(true);

  //     fetch('/api/register', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //     })
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         toast.success('Account created');
  //         signIn("credentials", {
  //             emails: data.email,
  //             password: data.password,
  //             redirect: false,
  //         });

  //         router.push('/cart');
  //         router.refresh();
  //         toast.success('Logged In');
  //     })
  //     .catch((error) => {
  //         toast.error("Something went wrong");
  //     })
  //     .finally(() => {
  //         setIsLoading(false);
  //     });
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");
        return signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
      })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh();
          toast.success("Logged In");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => {
        toast.error("Something went wrong...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className="text-center">Account already exist. Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Sign up for E shop" />
      <Button
        outline
        label="Sign up with Gogle"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="text"
      />
      <Input
        id="password"
        label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign-up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          {" "}
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
