import { useEffect, useState } from 'react';
import css from './index.module.less';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

interface NavBarProps {
    tabs: Array<{
        title: string;
        icon: React.ReactNode;
        content?: React.ReactNode;
    }>;
    currentTab?: number;
}

export default function NavBar({ tabs, currentTab }: NavBarProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [renderedTabs, setRenderedTabs] = useState<number[]>([0]);
    
    useEffect(() => {
        setActiveIndex(currentTab || 0);
        // 标记当前 tab 已渲染
        setRenderedTabs(prev =>
            prev.includes(activeIndex) ? prev : [...prev, activeIndex]
        );
    }, [activeIndex]);

    const changeActiveIndex = (e: React.SyntheticEvent, newValue: number) => {
        console.log('Tab changed to index:', e, newValue);
        setActiveIndex(newValue);
    }

    return (
        <div className={css.navbarContainer}>
            <div className={css.contentWrapper}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={css.tabContent}
                        style={{ display: activeIndex === index ? 'block' : 'none' }}
                    >
                        {renderedTabs.includes(index) ? tab.content : null}
                    </div>
                ))}
            </div>
            <BottomNavigation
                className={css.nav}
                showLabels
                value={activeIndex}
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