import React, { useEffect } from "react";
import { Button } from "../ui/button";

import { useQuery } from "@tanstack/react-query";
import { request } from "@/global/axiosGlobal";
import axios from "axios";

const SimilarDesigns = ({ categoryName }) => {
  //   const [pageNumber, setPageNumber] = useState(1);

  console.log(categoryName);

  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["designs", categoryName, pageNumber],
  //     queryFn: () => {
  //       return request.get(`design/${categoryName}/?page=${pageNumber}&limit=10`);
  //     },
  //     enabled: !!categoryName,
  //   });

  //   if (isLoading || isError) {
  //     return <div>Loading</div>;
  //   }

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/design/${categoryName}/?page=${pageNumber}&limit=10`
      )
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <>
      {/* <div className="max-h-[400px] mx-2"> */}
      {/* <div className="grid grid-cols-5 gap-2 gap-y-4">
          {data?.data.designs.map((design) => {
            return (
              <div className="cursor-pointer">
                <img
                  src={design.designUrl}
                  alt="design"
                  height={150}
                  width={150}
                />
              </div>
            );
          })}
        </div> */}
      {/* <div
          style={{
            margin: "16px 0",
            textAlign: "center",
          }}
        > */}
      {/* {data?.data.designs.length !== 0 && (
            <Button
              disabled={pageNumber === 1}
              onClick={() => {
                setPageNumber((prev) => prev - 1);
              }}
            >
              Previous
            </Button>
          )} */}

      {/* {new Array(data?.data.totalPages).fill(0).map((_, index) => (
            <Button
              variant={pageNumber === index + 1 ? "contained" : "text"}
              key={index}
              onClick={() => {
                setPageNumber(index + 1);
              }}
            >
              {index + 1}
            </Button>
          ))} */}

      {/* {data?.data.designs.length !== 0 && (
            <Button
              disabled={data?.data.totalPages === pageNumber}
              onClick={() => {
                setPageNumber((prev) => prev + 1);
              }}
            >
              Next
            </Button>
          )} */}
      {/* </div>
      </div> */}
    </>
  );
};
export default SimilarDesigns;
