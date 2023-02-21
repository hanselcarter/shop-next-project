import Link from "next/link";

import { useRouter } from "next/router";
import { useSignOut, useUser } from "@/hooks/user";

function NavBar(): JSX.Element {
  const router = useRouter();

  const signOut = useSignOut();

  const user = useUser();

  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role={"separator"} className="flex-1" />
        {user ? (
          <>
            <li>
              <button onClick={() => router.push("/cart")}>Cart</button>
            </li>
            <li>{user.username}</li>
            <li>
              <button onClick={signOut}>Sign Out</button>
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
