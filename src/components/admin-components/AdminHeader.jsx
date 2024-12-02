import { UserButton } from "@clerk/clerk-react";
import React from "react";

function AdminHeader() {
  return (
    <header>
      <UserButton />

      <h3>Admin Dashbboard</h3>
    </header>
  );
}

export default AdminHeader;
