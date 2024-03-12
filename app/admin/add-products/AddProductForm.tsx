"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryLabel";
import CheckBox from "@/app/components/inputs/CheckBox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import { categories } from "@/utils/category";
import { colors } from "@/utils/colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null
}

export type UploadedImageType = {
  color: string;
  colorcode: string;
  image: string
};


const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null> ();
  const [isProductCreated, setIsProductCreated] = useState(false);

  console.log('images: ', images)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    }
  });

  useEffect(()=>{
    setCustomValue('images', images)
  },[images])

  useEffect(()=> {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    };
  },[isProductCreated]);

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType)=> {
    setImages((prev) => {
      if (!prev) {
        return [value]
      }
      return [...prev, value]
    })
  },[])
  const removeImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        )
        return filteredImages
      }
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Product Data', data);
    // upload images to firebse
    // 
  }

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CheckBox
        id="inStock"
        register={register}
        label="This is product is in stock"
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div
          className="
            grid grid-cols-2 
            md:grid-cols-3 
            max-h-[50vh] 
            overflow-y-auto
            gap-3
        ">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span gap-2">
                <CategoryInput 
                    onClick={(category) => setCustomValue('category', category)} 
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                />
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col flex-wrap gap-4">
          <div>
            <div className="font-bold">Select the available product colors and upload their image</div>
            <div className="text0-sm">You must upload an image for each of the color selected otherwise your color selection will be ignored.</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {
              colors.map((item, index) => {
                return (
                  <SelectColor
                    key={index}
                    item={item}
                    addImageToState={addImageToState}
                    removeImageFromState={removeImageToState}
                    isProductCreated={isProductCreated}
                  />
                );
              })
            }
          </div>
        </div>
      </div>

      <Button 
        label={isLoading ? 'Loading' : 'Add Product'}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default AddProductForm;
