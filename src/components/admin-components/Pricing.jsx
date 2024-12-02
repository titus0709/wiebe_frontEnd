import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { API_URL } from "@/constants";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

function Pricing() {
  const [edit, setEdit] = useState({
    columnSingle: false,
    columnDouble: false,
  });

  const [price, setPrice] = useState({
    columnSingle: 299,
    columnDouble: 349,
  });

  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["price"],
    queryFn: () => {
      return axios.get(`http://localhost:8000/get-price`);
    },
  });

  const saveHandler = async (designCount) => {
    const data = {
      price: 0,
      designCount: 0,
    };

    switch (designCount) {
      case 1:
        data.price = price.columnSingle;
        data.designCount = 1;
        break;
      case 2:
        data.price = price.columnDouble;
        data.designCount = 2;
    }

    try {
      const response = await axios.post(
        `${API_URL}add-price`,

        data
      );

      if (response.data.status) {
        queryClient.invalidateQueries({
          queryKey: ["price"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <p className="text-2xl">Design Pricing</p>

      <div className="my-4">
        <div className="my-2">
          <div className="flex items-center gap-[8px] my-2">
            <p>1 Design Price</p>
            {edit.columnSingle ? (
              <div>
                <input
                  type="number"
                  className="w-[50px] outline-none border-none text-black"
                  value={price.columnSingle}
                  onChange={(e) => {
                    setPrice({
                      ...price,
                      columnSingle: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <span>{response.data[0].price}</span>
            )}
            <Button
              onClick={() => {
                setEdit({
                  ...edit,
                  columnSingle: true,
                });
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                saveHandler(1);

                setEdit({
                  ...edit,
                  columnSingle: false,
                });
              }}
            >
              Save
            </Button>
          </div>
          <div className="flex items-center gap-[8px]">
            <p>2 Design Price</p>
            {edit.columnDouble ? (
              <input
                type="number"
                className="w-[50px] outline-none border-none text-black"
                value={price.columnDouble}
                onChange={(e) => {
                  setPrice({
                    ...price,
                    columnDouble: e.target.value,
                  });
                }}
              />
            ) : (
              <span>{response.data[1].price}</span>
            )}
            <Button
              onClick={() => {
                setEdit({
                  ...edit,
                  columnDouble: true,
                });
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                saveHandler(2);

                setEdit({
                  ...edit,
                  columnDouble: false,
                });
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
