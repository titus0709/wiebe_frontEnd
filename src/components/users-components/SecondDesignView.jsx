import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { request } from "@/global/axiosGlobal";
import ReactSelect from "react-select";

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const DesignView = ({ categoryName, getSecondDesign, setOpen }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["designs", categoryName, pageNumber],
    queryFn: () => {
      return request.get(`design/${categoryName}/?page=${pageNumber}&limit=10`);
    },
  });
  

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="max-h-[400px] mx-2">
        <div className="grid grid-cols-5 gap-2 gap-y-4">
          {data?.data.designs.map((design) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => {
                  getSecondDesign(design.designUrl);
                  setOpen(false);
                }}
              >
                <img
                  src={design.designUrl}
                  alt="design"
                  height={150}
                  width={150}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            margin: "16px 0",
            textAlign: "center",
          }}
        >
          {data?.data.designs.length !== 0 && (
            <Button
              disabled={pageNumber === 1}
              onClick={() => {
                setPageNumber((prev) => prev - 1);
              }}
            >
              Previous
            </Button>
          )}

          {new Array(data?.data.totalPages).fill(0).map((_, index) => (
            <Button
              variant={pageNumber === index + 1 ? "contained" : "text"}
              key={index}
              onClick={() => {
                setPageNumber(index + 1);
              }}
            >
              {index + 1}
            </Button>
          ))}

          {data?.data.designs.length !== 0 && (
            <Button
              disabled={data?.data.totalPages === pageNumber}
              onClick={() => {
                setPageNumber((prev) => prev + 1);
              }}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const SecondDesignView = ({ getSecondDesign, setOpen }) => {
  const [value, setValue] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return request.get(`/get-categories`);
    },
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <div className="mx-4">
        <ReactSelect
          isLoading={isLoading}
          styles={{
            option: () => ({
              color: "black",
            }),
          }}
          options={data?.data.map((category) => {
            return {
              label: category.categoryName,
              value: category.categoryName,
            };
          })}
          value={value}
          onChange={(option) => {
            setValue(option);
          }}
        />
      </div>

      <DesignView
        categoryName={value?.value}
        getSecondDesign={getSecondDesign}
        setOpen={setOpen}
      />
    </div>
  );
};

export default SecondDesignView;
