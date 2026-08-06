import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ShopCartProvider } from "@/lib/shop-cart";

export const Route = createFileRoute("/shop")({
  component: ShopLayout,
});

function ShopLayout() {
  return (
    <ShopCartProvider>
      <Outlet />
    </ShopCartProvider>
  );
}
