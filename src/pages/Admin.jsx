import DesignTable from "@/components/admin-components/DesignTable";
import FileUpload from "@/components/admin-components/FileUpload";
import { API_URL } from "@/constants";
import axios from "axios";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/global/axiosGlobal";

const ReactSelect = ({ getOption }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return axios.get(`${API_URL}get-categories`);
    },
  });

  // console.log(data.data);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [value, setValue] = useState(null);
  return (
    <CreatableSelect
      isClearable
      isLoading={isLoading}
      options={data?.data.map((category) => {
        return {
          label: category.categoryName,
          value: category.categoryName,
        };
      })}
      onCreateOption={(value) => {
        setValue({
          label: value,
          value,
        });

        axios.post(`${API_URL}upload/create-category/${value}`).then((res) => {
          console.log(res.data);
          if (res.data.status) {
            console.log(res.data.status);
            toast({
              variant: "success",
              description: "Category has been created Successfully",
            });
            queryClient.invalidateQueries({
              queryKey: ["categories"],
            });
            queryClient.invalidateQueries({
              queryKey: ["all-categories"],
            });
          }
        });
        getOption(value);
      }}
      value={value}
      onChange={(option) => {
        setValue(option);
        getOption(option?.value);
      }}
      placeholder={"Create or Search Design Theme"}
      styles={{
        option: () => ({
          color: "black",
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
        }),
      }}
    />
  );
};

function Admin() {
  const [optionNotPresent, setOptionNotPresent] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const getOption = (value) => {
    if (value && value.length > 0) {
      setOptionNotPresent(false);
      setSelectedOption(value);
    } else {
      setOptionNotPresent(true);
    }
  };
  return (
    <>
      <h4 className="text-2xl font-bold">Upload Design</h4>
      <div className="flex items-center sm:justify-between md:justify-start my-4">
        <div className="sm:w-full md:w-3/6">
          <ReactSelect getOption={getOption} />
        </div>
        <div className="mx-2">
          <FileUpload
            optionNotPresent={optionNotPresent}
            category={selectedOption}
          />
        </div>
      </div>
      <div className="my-4">
        <h4 className="text-2xl font-bold">Desgin Table</h4>
      </div>
      <DesignTable />
      <Toaster />
    </>
  );
}

export default Admin;
