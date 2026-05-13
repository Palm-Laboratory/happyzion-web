export type NavigationLink = {
  label: string;
  href: string;
  description?: string;
  openInNewTab?: boolean;
  children?: NavigationLink[];
};
