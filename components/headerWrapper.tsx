'use client';

import { SessionProvider } from "next-auth/react";
import Header from "./header";

interface HeaderWrapperProps {
  children: React.ReactNode;
  session?: any;
}

export const HeaderWrapper = ({ children, session }: HeaderWrapperProps) => {
  return (
    <SessionProvider session={session}>
      <Header />
      {children}
    </SessionProvider>
  );
};
