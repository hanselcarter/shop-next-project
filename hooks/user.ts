import { User } from "../pages/api/login";
import { useQuery } from "react-query";
import { fetchJson, ApiError } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";

export function useUser(): User | undefined {
  const query = useQuery(
    "user",
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
    queryClient.setQueryData("user", user);
  };

  return {
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
    signIn,
  };
}
