import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/global/axiosGlobal";

export function CheckoutAddress() {
  const [addressType, setAddressType] = useState("home");
  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["addresses", user.id],
    queryFn: () => {
      return axios.get(`http://localhost:8000/addresses?userId=${user.id}`);
    },
  });
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const payload = {
        addressType,
        address,
        userId: user.id,
      };

      const response = await axios.post(`${API_URL}submit-address`, payload);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting address:", error);
    }
    alert('Your Order is completed')
    navigate("/")
    
  };

  const [selectedAddress, setSelectedAddress] = useState({});

  const [showAddress, setShowAddress] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }
  console.log(data?.data);
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <div className="w-full">
            <Button className="w-full" variant="outline">
             Continue
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="h-[456px] sm:h-fit overflow-y-scroll"
        >
          <SheetHeader>
            <SheetTitle>Add or Choose Address to proceed</SheetTitle>
          </SheetHeader>
          <div className="my-2 flex gap-4 items-center">
            <Button
              onClick={() => {
                setShowAddress(!showAddress);
                setAddress({
                  addressLine1: "",
                  addressLine2: "",
                  landmark: "",
                  pincode: "",
                  city: "",
                  state: "",
                  country: "",
                });
              }}
            >
              {showAddress ? <Minus /> : <Plus />}
            </Button>

            <div className="flex gap-6">
              {data?.data.map((address, index) => {
                return (
                  <div
                    key={index}
                    className={`border border-black p-2 rounded-sm cursor-pointer ${
                      selectedAddress.index === index && "border-emerald-700"
                    }`}
                    onClick={() => {
                      setSelectedAddress({ address, index });
                      setShowAddress(true);
                      setAddress(address);
                      setAddressType(address.addressType);
                    }}
                  >
                    <p>{address.addressType}</p>
                    <div>{address.city}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {showAddress && (
            <div className="sm:flex sm:justify-center w-full">
              <div className="sm:w-2/4 my-1">
                <Select
                  onValueChange={(option) => {
                    setAddressType(option);
                  }}
                  value={addressType}
                >
                  <SelectTrigger className="my-2">
                    <SelectValue placeholder="Select Address Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Address</SelectLabel>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="">
                  <Input
                    id="addressLine1"
                    placeholder="Address Line 1"
                    value={address.addressLine1}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="my-[8px]">
                  <Input
                    id="addressLine2"
                    placeholder="Address Line 2"
                    value={address.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex-col md:flex-row flex justify-between gap-2 my-1">
                  <div className="md:w-2/4">
                    <Input
                      id="landmark"
                      placeholder="Landmark"
                      value={address.landmark}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:w-2/4">
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex-col md:flex-row flex justify-between gap-2 my-1">
                  <div className="md:w-2/4">
                    <Input
                      id="city"
                      placeholder="City"
                      value={address.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:w-2/4">
                    <Input
                      id="state"
                      placeholder="State"
                      value={address.state}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex-col md:flex-row flex justify-between gap-2 my-1">
                  <div className="md:w-2/4">
                    <Input
                      id="country"
                      placeholder="Country"
                      value={address.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <SheetFooter className="my-2 md:my-0">
            <SheetClose asChild>
              <Button type="submit" onClick={submitHandler}>
                Proceed
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
