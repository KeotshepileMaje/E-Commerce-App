"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    if (!data.search) return router.push("/");
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          search: data.search,
        },
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <input
        {...register("search")}
        autoComplete="off"
        type="text"
        placeholder="explore"
        className="p-2 border border-gray-300 rounded-1-md
            focus:outline-none focus:border-[0.5px] focus:border-slate-500
            w-80 
            "
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md h-full"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
