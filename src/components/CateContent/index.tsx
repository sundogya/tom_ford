import React, { useState, useEffect, useRef } from 'react';
import css from './index.module.less';
import { Tabs, Tab } from '@mui/material';
interface CateContent {
    id?: string | number;
    tags?: string[];
    title?: string;
    price?: string | number;
    thumb?: string;
    [key: string]: any;
}
interface SubTab {
    id?: string | number;
    title: string;
    subTitle?: string;
    image?: string;
    list?: CateContent[];
    [key: string]: any;
}

interface CateContentProps {
    subTabs: SubTab[];
}
export type { CateContent, SubTab };
function ProductCard({ product }: { product: CateContent }) {
    // Generate responsive image URLs with different sizes
    const getResponsiveImageUrl = (baseUrl: string| undefined, width: number) => {
        // Add width parameter if the URL supports it, or use the base URL
        const url = new URL(baseUrl || '', window.location.origin);
        url.searchParams.set('width', `${width}px`);
        return url.toString();
    };

    return (<div className={css.productCardContainer}>
        <div className={css.productCard}>
            <img 
                src={getResponsiveImageUrl(product.thumb, 400)} 
                srcSet={`
                    ${getResponsiveImageUrl(product.thumb, 300)} 300w,
                    ${getResponsiveImageUrl(product.thumb, 400)} 400w,
                    ${getResponsiveImageUrl(product.thumb, 600)} 600w
                `}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                alt={product.title || 'product'} 
            />
        </div>
        {product.tags ?
            (<span className={css.productTags}>{(product.tags || []).map(tag => tag).join(', ')}</span>)
            : null
        }
        <span className={css.productTitle}>{product.title}</span>
        <span className={css.productPrice}>&yen;{product.price}</span>
    </div>)
}
export default function CateContent({ subTabs }: CateContentProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const tabContentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            console.log('Content scrolled');
            if (!contentRef.current) return;
            
            // 监听 subTabsContent 容器内的滚动
            const scrollContainer = contentRef.current;
            let currentIndex = 0;
            
            // 遍历所有 tab 内容检查哪个在视口
            for (let i = 0; i < tabContentRefs.current.length; i++) {
                const element = tabContentRefs.current[i];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const containerRect = scrollContainer.getBoundingClientRect();
                    
                    // 如果该元素在容器视口中间以上，则认为是当前 tab
                    if (rect.top - containerRect.top < containerRect.height / 2) {
                        currentIndex = i;
                    }
                }
            }
            
            setActiveIndex(currentIndex);
        };
        
        const handleWheel = (e: WheelEvent) => {
            // 阻止滚轮事件冒泡到页面
            e.stopPropagation();
        };
        
        const contentElement = contentRef.current;
        if (contentElement) {
            console.log('Adding scroll and wheel event listeners', contentElement);
            contentElement.addEventListener('scroll', handleScroll);
            contentElement.addEventListener('wheel', handleWheel, { passive: true });
            return () => {
                contentElement.removeEventListener('scroll', handleScroll);
                contentElement.removeEventListener('wheel', handleWheel);
            };
        }
    }, []);

    const changeActiveIndex = (e: React.SyntheticEvent, newValue: number) => {
        console.log('SubTab changed to index:', newValue, e);
        setActiveIndex(newValue);
        
        // 滚动到对应的内容区域
        const targetElement = tabContentRefs.current[newValue];
        if (targetElement && contentRef.current) {
            contentRef.current.scrollTop = targetElement.offsetTop;
        }
    }

    return (
        <div className={css.cateContentContainer}>
            <Tabs
                className={css.subTabs}
                value={activeIndex}
                onChange={changeActiveIndex}
                orientation='vertical'
                variant="scrollable"
                scrollButtons="auto"
            >
                {subTabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.title}
                        iconPosition="top"
                        className={css.subTabItem}
                    />
                ))}
            </Tabs>
            <div className={css.subTabsContent} ref={contentRef}>
                {subTabs.map((tab, index) => (
                    <div
                        key={index}
                        className={css.tabContent}
                        ref={(el) => {
                            tabContentRefs.current[index] = el;
                        }}
                    >
                    <div className={css.subTabImageContainer}>
                            <img 
                                src={tab.image?.split('?')[0] + '?width=1200px'} 
                                srcSet={`
                                    ${tab.image?.split('?')[0]}?width=600px 600w,
                                    ${tab.image?.split('?')[0]}?width=1200px 1200w,
                                    ${tab.image?.split('?')[0]}?width=1600px 1600w
                                `}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 600px"
                                alt={tab.title} 
                                className={css.subTabImage} 
                            />
                            <span className={css.subTabImageSubtitle}>{tab.subTitle?.toLocaleUpperCase()}</span>
                            <span className={css.subTabImageTitle}>{tab.title}</span>
                        </div>

                        <div className={css.subTabProductList}>
                            {tab.list?.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}