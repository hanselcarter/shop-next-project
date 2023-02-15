import Field from "@/components/Field";

import Page from "@/components/Page";

import { useState } from "react";
import { useRouter } from "next/router";

import { useSignIn } from "@/hooks/user";

const SignInPage = (): JSX.Element => {
  const router = useRouter();
  const { signIn, signInError, signInLoading } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(email, password);

      router.push("/");
    } catch (err) {
      // mutation.isError will be true
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field
          type="email"
          label="Email"
          value={email}
          onChange={setEmail}
          required={true}
        />
        <Field
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          required={true}
        />
        {signInError && <p className="text-red-200">Invalid credentials</p>}
        {signInLoading ? (
          <p>...loading</p>
        ) : (
          <button
            type="submit"
            className="bg-green-800 px-4 py-2 rounded m-4 text-gray-100 hover:bg-green-700"
          >
            Sign In
          </button>
        )}
      </form>
    </Page>
  );
};

export default SignInPage;
