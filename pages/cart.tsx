import Title from "@/components/Title";
import { Product } from "./api/products";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import Page from "@/components/Page";
import { useCart } from "@/hooks/cart";

function CartPage() {
  const cart = useCart();

  const getTotal = (): number => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };

  return (
    <Page title="Cart">
      <main className="p-4">
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.product.title}</td>
                <td className="px-4 py-2">{item.product.price}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  {item.quantity * item.product.price}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-4 py-2">Total </th>
              <th></th>
              <th></th>
              <th className="px-4 py-2">{getTotal()}</th>
            </tr>
          </tfoot>
        </table>
      </main>
    </Page>
  );
}

export default CartPage;
