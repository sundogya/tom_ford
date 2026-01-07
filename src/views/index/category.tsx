
import { AppBar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import css from './style/index.module.less';
import { useEffect, useState } from 'react';
import { useIndexContext } from '@/context/IndexContext';
import CateContent from '@/components/CateContent';
const Gift = () => {
    const { cateTabs, setCateTabs } = useIndexContext();
    const [cateTab, setCateTab] = useState(2)
    useEffect(() => {
        console.log("Gift mounted");
        if (cateTabs?.length === 0) {
            setCateTabs([{  
                id: 1,
                title: "女士",
                subTabs: []
            }, {
                id: 2,
                title: "男士",
                subTabs: []
            }, {
                id: 3,
                title: "香氛",
                subTabs: [
                    {
                        id: 11,
                        title: "私人调香",
                        subTitle: "Private Blend",
                        image: 'https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px',
                        list: [
                            {
                                id: 101,
                                tags: ['新品'],
                                title: "私藏调香系列-白麝香与木质香调香水",
                                price: 3200,
                                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px"
                            },
                            {
                                id: 102,
                                tags: ['新品'],
                                title: "私藏调香系列-黑色兰花与木质香调香水",
                                price: 3200,
                                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px"
                            },
                            {
                                id: 103,
                                tags: ['新品'],
                                title: "私藏调香系列-烟草与佛手柑调香水",
                                price: 3200,
                                thumb: "https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px"
                            }
                        ]
                    }, {
                        id: 12,
                        title: "经典香氛",
                        subTitle: "Signature",
                        list: []
                    }, {
                        id: 13,
                        title: "身体系列",
                        subTitle: "Body",
                        list: []
                    }, {
                        id: 14,
                        title: "香氛礼盒",
                        subTitle: "Fragrance Sets",
                        list: []
                    }]
            }, {
                id: 4,
                title: "礼盒",
                subTabs: []
            }, {
                id: 5,
                title: "眼镜",
                subTabs: []
            }]);
        }
        return () => {
            console.log("Gift unmounted");
        };
    }, []);
    const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
        setCateTab(newValue);
    }
    return (<>
        <div className={css.gift}>
            <AppBar position="static">
                <Tabs value={cateTab} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    {cateTabs?.map((tab, index) => (
                        <Tab key={index} label={tab.title} />
                    ))}
                </Tabs>
            </AppBar>
            <CateContent subTabs={cateTabs?.[cateTab]?.subTabs || []}></CateContent>
        </div>
    </>)
}

export default Gift;