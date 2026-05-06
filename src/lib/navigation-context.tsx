"use client";

import { createContext, useContext } from "react";
import { toNavMenuGroups } from "@/lib/navigation-utils";
import type { NavigationResponse, NavMenuGroup } from "@/lib/navigation-types";

interface NavigationContextValue {
  navigation: NavigationResponse;
  navMenuGroups: NavMenuGroup[];
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  navigation,
  children,
}: {
  navigation: NavigationResponse;
  children: React.ReactNode;
}) {
  const navMenuGroups = toNavMenuGroups(navigation);

  return (
    <NavigationContext.Provider value={{ navigation, navMenuGroups }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider.");
  }

  return context;
}
