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
    <li className={`flex items-start gap-4 ${className ?? ""}`} {...props}>
      <span className="mt-[0.72em] h-2 w-2 shrink-0 rounded-full bg-[#8b6db5]" />
      <span className="flex-1">{children}</span>
    </li>
  );
}
