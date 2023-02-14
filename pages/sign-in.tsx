import Field from "@/components/Field";

import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/router";

const SignInPage = (): JSX.Element => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    error: false,
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setStatus({ loading: true, error: false });

      await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      router.push("/");

      setStatus({ loading: false, error: false });
    } catch (err) {
      setStatus({ loading: false, error: true });
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
        {status.error && <p className="text-red-200">Invalid credentials</p>}
        {status.loading ? (
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
