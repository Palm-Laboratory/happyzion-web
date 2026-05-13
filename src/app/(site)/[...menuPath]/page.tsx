import {
  generateMenuDispatcherMetadata,
  renderMenuDispatcherPage,
  type MenuDispatcherPageProps,
} from "@/features/public-menu/menu-dispatcher";

export const generateMetadata = generateMenuDispatcherMetadata;

export default function MenuDispatcherPage(props: MenuDispatcherPageProps) {
  return renderMenuDispatcherPage(props);
}
