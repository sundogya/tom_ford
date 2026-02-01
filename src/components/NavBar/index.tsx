import { useEffect, useState } from 'react';
import css from './index.module.less';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

interface NavBarProps {
    tabs: Array<{
        title: string;
        icon: React.ReactNode;
        content?: React.ReactNode;
    }>;
    currentTab: number;
    onTabChange: (newIndex: number) => void;
}

export default function NavBar({ tabs, currentTab, onTabChange }: NavBarProps) {
    const [renderedTabs, setRenderedTabs] = useState<number[]>([0]);
    
    // 同步外部 currentTab 到内部状态（当 parent 想要控制时）
    useEffect(() => {
        const idx = typeof currentTab === 'number' ? currentTab : undefined;
        if (typeof idx === 'number') {
            setRenderedTabs(prev => (prev.includes(idx) ? prev : [...prev, idx]));
        }
    }, [currentTab]);

    const changeActiveIndex = (e: React.SyntheticEvent, newValue: number) => {
        console.log('Tab changed to index:', e, newValue);
        if (onTabChange) onTabChange(newValue);
    }

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
                        icon={tab.icon as React.ReactElement}
                        className={css.navItem}
                    />
                ))}
            </BottomNavigation>
        </div>
    );
}