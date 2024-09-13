import InternalTabs from '@/base/tabs/tabs';
import Tab from '@/base/tabs/tab';

export type { TabsProps } from '@/base/tabs/tabs';
export type { TabProps } from '@/base/tabs/tab';

type InternalTabsType = typeof InternalTabs;
export interface TabsInterface extends InternalTabsType {
    Tab: typeof Tab;
}

const Tabs = InternalTabs as TabsInterface;
Tabs.Tab = Tab;

export default Tabs;