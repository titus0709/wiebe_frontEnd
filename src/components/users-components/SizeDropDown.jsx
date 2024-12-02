import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SizeDropDown({ sizeHandler }) {
  const [size, setSize] = React.useState("S");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[250px]">
          {size}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Select Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={size} onValueChange={sizeHandler}>
          <DropdownMenuRadioItem value="XS">XS</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="S">S</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="M">M</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="L">L</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="XL">XL</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="XXL">XXL</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
