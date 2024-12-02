// import React from "react";

// import DesignSelectionTable from "@/components/users-components/DesignSelectionTable";

// function Home() {
//   return (
//     <>
//       <div className="">
//         <DesignSelectionTable />
//       </div>
//     </>
//   );
// }

// export default Home;

import React from "react";
import ProtectedRoutes  from "@/components/ProtectedRoutes";
import NavbarNew  from "@/components/NavbarNew";

import DesignSelectionTable from "@/components/users-components/DesignSelectionTable";

function Home() {
  return (
    <>
      <div className="">

        {/* <ProtectedRoutes/> */}
        <NavbarNew/>
        <DesignSelectionTable />
      </div>
    </>
  );
}

export default Home;

