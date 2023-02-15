import { User } from "../pages/api/login";
import { useQuery } from "react-query";
import { fetchJson, ApiError } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

const USER_QUERY_KEY = "user";
export function useUser(): User | undefined {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("api/user");
      } catch (err) {
        return undefined;
      }
    },
    {
      staleTime: 30_000,
      cacheTime: Infinity,
    }
  );

  const user = query.data as User | undefined;

  return user;
}

interface UseMutationLogin {
  email: string;
  password: string;
}

interface UseSignIn {
  signInError: boolean;
  // user:User |undefined;
  signInLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
}

export function useSignIn(): UseSignIn {
  const queryClient = useQueryClient();
  //Used most when mutating data not to get (mostly)
  const mutation = useMutation<Response, ApiError, UseMutationLogin>(
    async ({ email, password }) => {
      return await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    }
  );

  const signIn = async (email: string, password: string): Promise<void> => {
    const user = await mutation.mutateAsync({ email, password });
    queryClient.setQueryData(USER_QUERY_KEY, user);
  };

  return {
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
    signIn,
  };
}

export function useSignOut() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation(() => fetchJson("api/logout"));

  return async () => {
    await mutation.mutateAsync();

    queryClient.setQueryData(USER_QUERY_KEY, undefined);

    router.push("/sign-in");
  };
}
