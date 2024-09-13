import  InternalSidebar from '@/base/sidebar/sidebar';
import SidebarItem from '@/base/sidebar/sidebar-item';

export type { SidebarProps } from '@/base/sidebar/sidebar';
export type { SidebarItemProps } from '@/base/sidebar/sidebar-item';

type InternalSidebarType = typeof InternalSidebar;

export interface SidebarInterface extends InternalSidebarType {
    Item: typeof SidebarItem;
}

const Sidebar = InternalSidebar as SidebarInterface;

Sidebar.Item = SidebarItem;
export default Sidebar;