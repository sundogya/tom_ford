import { useState } from 'react';
import css from './index.module.less';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

export interface NavTabItem {
    title: string;
    icon: React.ReactNode;
    content?: React.ReactNode;
    badge?: number;
}

interface NavBarProps {
    tabs: Array<NavTabItem>;
    currentTab: number;
    onTabChange: (newIndex: number) => void;
}

export default function NavBar({ tabs, currentTab, onTabChange }: NavBarProps) {
    const [renderedTabs, setRenderedTabs] = useState<number[]>(() =>
        typeof currentTab === 'number' ? [currentTab] : [0]
    );

    if (typeof currentTab === 'number' && !renderedTabs.includes(currentTab)) {
        setRenderedTabs([...renderedTabs, currentTab]);
    }

    const changeActiveIndex = (e: React.SyntheticEvent, newValue: number) => {
        console.log('Tab changed to index:', e, newValue);
        if (onTabChange) onTabChange(newValue);
    };

    return (
        <div className={css.navbarContainer}>
            <div className={css.contentWrapper}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={css.tabContent}
                        style={{ display: currentTab === index ? 'block' : 'none' }}
                    >
                        {renderedTabs.includes(index) ? tab.content : null}
                    </div>
                ))}
            </div>
            <BottomNavigation
                className={css.nav}
                showLabels
                value={currentTab}
                onChange={changeActiveIndex}
            >
                {tabs.map((tab, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={tab.title}
                        icon={
                            <span className={css.iconWrap}>
                                {tab.icon}
                                {typeof tab.badge === 'number' && tab.badge > 0 ? (
                                    <span className={css.badge}>
                                        {tab.badge > 99 ? '99+' : tab.badge}
                                    </span>
                                ) : null}
                            </span>
                        }
                        className={css.navItem}
                    />
                ))}
            </BottomNavigation>
        </div>
    );
}
