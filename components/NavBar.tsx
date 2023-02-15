import { fetchJson } from "@/lib/api";
import Link from "next/link";

import { useRouter } from "next/router";
import { useUser } from "@/hooks/user";

function NavBar(): JSX.Element {
  const router = useRouter();

  const user = useUser();

  console.log("navbar", user);

  const handleSignOut = async () => {
    await fetchJson("api/logout");
    // setUser(undefined);
    router.push("/sign-in");
  };
  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role={"separator"} className="flex-1" />
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign-In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
