import { fetchJson } from "@/lib/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
interface AddToCartWidgetProps {
  productId: number;
}
function AddToCartWidget({ productId }: AddToCartWidgetProps): JSX.Element {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation(() =>
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  const handleClick = async () => {
    await mutation.mutateAsync();

    // router.push("/cart");
  };
  return (
    <div className=" py-2">
      <input
        type={"number"}
        min="1"
        className=" border rounded px-3 py-1 mr-2 w-16 text-right"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button
        className="bg-green-800 px-4 py-2 rounded m-4 text-gray-100 hover:bg-green-700"
        onClick={handleClick}
      >
        Add to cart
      </button>
    </div>
  );
}

export default AddToCartWidget;
