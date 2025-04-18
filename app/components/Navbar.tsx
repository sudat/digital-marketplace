import { MobileMenu } from "@/app/components/MobileMenu";
import { NavbarLinks } from "@/app/components/NavbarLinks";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/app/components/UserNav";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="relative container w-full flex md:grid grid-cols-12 items-center px-4 md:px-8 mx-auto py-7 justify-between">
      {/* left : logo */}
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-3xl font-extrabold">
            Marshal <span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>

      {/* center : Navbar Links */}
      <NavbarLinks />

      {/* right : login and signup */}
      <div className="md:col-span-3 flex  justify-end">
        {user ? (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImageUrl={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="flex gap-x-2  items-center">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant={"secondary"} asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}
        {/* mobile only */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
