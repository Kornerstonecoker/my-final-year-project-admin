import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar =async () => {
  const{userId} =auth();

/* The code `if(!userId){ redirect("/sign-in") }` is checking if the `userId` variable is falsy (null,
undefined, false, 0, etc.). If the `userId` is falsy, it means that the user is not authenticated or
logged in. In that case, the code redirects the user to the "/sign-in" page using the `redirect`
function from the "next/navigation" module. This ensures that only authenticated users can access
the content rendered by the `Navbar` component. */
  if(!userId){
    redirect("/sign-in")
  }

/* The code `const stores = await prismadb.store.findMany({ where: { userId } })` is querying the
database using the `prismadb` library to find all the stores that belong to a specific user. It is
using the `findMany` method to retrieve multiple store records that match the specified condition,
which in this case is the `userId`. The `userId` is passed as a parameter to the `where` clause to
filter the stores based on the user ID. The result is stored in the `stores` variable. */
  const stores = await prismadb.store.findMany({
    where:{
      userId
    }
  })
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores}/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
