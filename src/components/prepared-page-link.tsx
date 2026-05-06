"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type PreparedPageLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  children: ReactNode;
  href?: string;
};

export default function PreparedPageLink({
  children,
  href = "#",
  ...props
}: PreparedPageLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.alert("상세 페이지 준비 중입니다.");
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
