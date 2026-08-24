import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

import { ShopCartProvider } from "@/lib/shop-cart";

export const Route = createLazyFileRoute("/shop")({
  component: ShopLayout,
});

function ShopLayout() {
  return (
    <ShopCartProvider>
      <Outlet />
    </ShopCartProvider>
  );
}
