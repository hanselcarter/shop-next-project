import { useQuery } from "react-query";
import { fetchJson, ApiError } from "@/lib/api";
import { Cart } from "../pages/api/cart";

const USER_QUERY_KEY = "cart";

export function useCart(): Cart[] | undefined {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("api/cart");
      } catch (err) {
        return undefined;
      }
    },
    {
      staleTime: 30_000,
      cacheTime: Infinity,
    }
  );

  const cart = query.data as Cart[] | undefined;

  return cart;
}
