import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const SHOP_CART_KEY = "texasdefined-shop-cart-v1";

export type ShopCartItem = {
  key: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  variantId: number | null;
  variantTitle: string | null;
  quantity: number;
};

type ShopCartValue = {
  items: ShopCartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<ShopCartItem, "key">) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const ShopCartContext = createContext<ShopCartValue | null>(null);

export function ShopCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShopCartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(SHOP_CART_KEY) || "[]");
      if (Array.isArray(stored)) setItems(stored);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(SHOP_CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<ShopCartValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    add: (input) => {
      const key = `${input.productId}::${input.variantId ?? "default"}`;
      setItems((current) => {
        const found = current.find((item) => item.key === key);
        return found
          ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + input.quantity } : item)
          : [...current, { ...input, key }];
      });
    },
    setQuantity: (key, quantity) => setItems((current) => quantity <= 0 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity } : item)),
    remove: (key) => setItems((current) => current.filter((item) => item.key !== key)),
    clear: () => setItems([]),
  }), [items, ready]);

  return <ShopCartContext.Provider value={value}>{children}</ShopCartContext.Provider>;
}

export function useShopCart() {
  const value = useContext(ShopCartContext);
  if (!value) throw new Error("useShopCart must be used inside ShopCartProvider");
  return value;
}
