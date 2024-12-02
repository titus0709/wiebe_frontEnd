import React from "react";
import { DataTable } from "@/components/admin-components/data-table";
import FileUpload from "./FileUpload";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/constants";
import DesignViewModal from "./DesignViewModal";
import DesignView from "./DesignView";

function DesignTable() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: () => {
      return axios.get(`http://localhost:8000/get-categories-details`);
    },
  });

  const adminDesignTableColumns = [
    {
      accessorKey: "designTheme",
      header: "Design Theme",
    },
    {
      accessorKey: "designCount",
      header: "No Of Designs",
    },

    {
      accessorKey: "orders",
      header: "Orders",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        //console.log(row.original);
        return (
          <div className="flex">
            <DesignViewModal>
              <DesignView categoryName={row.original.designTheme} />
            </DesignViewModal>

            <div className="ml-4">
              <FileUpload
                optionNotPresent={false}
                category={row.original.designTheme}
              />
            </div>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable
        columns={adminDesignTableColumns}
        //data={[]}
        data={response.data.map((category) => {
          return {
            designTheme: category.categoryName,
            designCount: category.noOfDesigns,
            orders: category.noOfOrders,
            id: category._id,
          };
        })}
      />
    </div>
  );
}

export default DesignTable;
