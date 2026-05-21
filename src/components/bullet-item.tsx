import type { LiHTMLAttributes, ReactNode } from "react";

type BulletItemProps = {
  children: ReactNode;
} & LiHTMLAttributes<HTMLLIElement>;

export default function BulletItem({
  children,
  className,
  ...props
}: BulletItemProps) {
  return (
    <li className={`flex items-start gap-comp-base ${className ?? ""}`} {...props}>
      <span className="mt-[0.62em] h-2.5 w-2.5 shrink-0 rounded-full bg-[#8b6db5] shadow-[0_0_0_3px_rgba(139,109,181,0.16)]" />
      <span className="flex-1">{children}</span>
    </li>
  );
}
