import { AppBar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import css from './style/index.module.less';
import { useEffect, useState } from 'react';
import { useIndexContext } from '@/context/IndexContext';
import CateContent, { type SubTab } from '@/components/CateContent';

const IMG_DARK = 'https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px';
const IMG_CHERRY = 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=1400px&width=1400px';

const DEFAULT_CATEGORIES: { id: number; title: string; subTabs: SubTab[] }[] = [
    {
        id: 1,
        title: '女士',
        subTabs: [
            {
                id: 101,
                title: '女士唇妆',
                subTitle: 'Lip Color',
                image: IMG_CHERRY,
                list: [
                    { id: 1001, tags: ['热卖'], title: '烈焰幻魅唇膏 #16 斯嘉丽红', price: 490, thumb: IMG_CHERRY },
                    { id: 1002, tags: ['新品'], title: '烈焰幻魅哑光唇膏 #100 伯爵茶', price: 490, thumb: IMG_CHERRY },
                    { id: 1003, tags: ['经典'], title: '细黑管唇膏 #01 裸玫瑰', price: 460, thumb: IMG_DARK },
                ],
            },
            {
                id: 102,
                title: '眼部彩妆',
                subTitle: 'Eye Color',
                image: IMG_DARK,
                list: [
                    { id: 1004, tags: ['热卖'], title: '高定四色眼影 #20 蜜桃琥珀', price: 760, thumb: IMG_CHERRY },
                    { id: 1005, tags: ['经典'], title: '高定四色眼影 #04 迷醉烟熏', price: 760, thumb: IMG_DARK },
                    { id: 1006, tags: ['新品'], title: '双头液体眼线笔', price: 480, thumb: IMG_DARK },
                ],
            },
            {
                id: 103,
                title: '底妆修容',
                subTitle: 'Complexion',
                image: IMG_CHERRY,
                list: [
                    { id: 1007, tags: ['热卖'], title: '柔雾持妆粉底液 30ML', price: 780, thumb: IMG_DARK },
                    { id: 1008, tags: ['经典'], title: '黑金气垫粉底液', price: 690, thumb: IMG_DARK },
                    { id: 1009, tags: ['推荐'], title: '光影双色修容盘', price: 680, thumb: IMG_CHERRY },
                ],
            },
            {
                id: 104,
                title: '女士香氛',
                subTitle: "Women's Fragrance",
                image: IMG_CHERRY,
                list: [
                    { id: 1010, tags: ['经典'], title: '黑色兰花香水 50ML', price: 1450, thumb: IMG_DARK },
                    { id: 1011, tags: ['新品'], title: '「烟熏樱桃」暗樱撩情香水 50ML', price: 2950, thumb: IMG_CHERRY },
                    { id: 1012, tags: ['热卖'], title: '玫瑰秘境香水 50ML', price: 2950, thumb: IMG_CHERRY },
                ],
            },
        ],
    },
    {
        id: 2,
        title: '男士',
        subTabs: [
            {
                id: 201,
                title: '男士香氛',
                subTitle: "Men's Fragrance",
                image: IMG_DARK,
                list: [
                    { id: 2001, tags: ['热卖'], title: '珍华乌木香水 OUD WOOD 50ML', price: 2450, thumb: IMG_DARK },
                    { id: 2002, tags: ['经典'], title: '灰色香根草香水 50ML', price: 1250, thumb: IMG_DARK },
                    { id: 2003, tags: ['新品'], title: '蔚蓝海岸香水 50ML', price: 1380, thumb: IMG_DARK },
                ],
            },
            {
                id: 202,
                title: '男士理容',
                subTitle: 'Grooming',
                image: IMG_DARK,
                list: [
                    { id: 2004, tags: ['推荐'], title: '珍华乌木舒缓须后乳 100ML', price: 620, thumb: IMG_DARK },
                    { id: 2005, tags: ['经典'], title: '男士密集修护保湿面霜 50ML', price: 1180, thumb: IMG_DARK },
                    { id: 2006, tags: ['热卖'], title: '净澈控油洁面啫喱 150ML', price: 420, thumb: IMG_DARK },
                ],
            },
            {
                id: 203,
                title: '男士成衣',
                subTitle: 'Ready-to-Wear',
                image: IMG_DARK,
                list: [
                    { id: 2007, tags: ['高定'], title: '意式羊毛双排扣晚宴西装', price: 32800, thumb: IMG_DARK },
                    { id: 2008, tags: ['经典'], title: '真丝提花晚宴衬衫', price: 6900, thumb: IMG_DARK },
                    { id: 2009, tags: ['新品'], title: '美利奴羊绒高领针织衫', price: 11500, thumb: IMG_DARK },
                ],
            },
            {
                id: 204,
                title: '皮具配饰',
                subTitle: 'Leather Goods',
                image: IMG_DARK,
                list: [
                    { id: 2010, tags: ['经典'], title: '粒面小牛皮商务托特包', price: 18900, thumb: IMG_DARK },
                    { id: 2011, tags: ['热卖'], title: '鳄鱼纹压花小牛皮短款钱夹', price: 4200, thumb: IMG_DARK },
                    { id: 2012, tags: ['经典'], title: '标志性 T 字扣双面腰带', price: 5600, thumb: IMG_DARK },
                ],
            },
        ],
    },
    {
        id: 3,
        title: '香氛',
        subTabs: [
            {
                id: 11,
                title: '私人调香',
                subTitle: 'Private Blend',
                image: IMG_DARK,
                list: [
                    { id: 101, tags: ['新品'], title: '私藏调香系列-白麝香与木质香调香水', price: 3200, thumb: IMG_DARK },
                    { id: 102, tags: ['新品'], title: '私藏调香系列-黑色兰花与木质香调香水', price: 3200, thumb: IMG_DARK },
                    { id: 103, tags: ['新品'], title: '私藏调香系列-烟草与佛手柑调香水', price: 3200, thumb: IMG_DARK },
                ],
            },
            {
                id: 12,
                title: '经典香氛',
                subTitle: 'Signature',
                image: IMG_DARK,
                list: [
                    { id: 3001, tags: ['经典'], title: '黑色兰花浓香水 50ML', price: 1450, thumb: IMG_DARK },
                    { id: 3002, tags: ['热卖'], title: '暗影皮革香水 50ML', price: 1580, thumb: IMG_DARK },
                    { id: 3003, tags: ['推荐'], title: '蔚蓝海岸淡香精 50ML', price: 1380, thumb: IMG_DARK },
                ],
            },
            {
                id: 13,
                title: '身体系列',
                subTitle: 'Body',
                image: IMG_CHERRY,
                list: [
                    { id: 3004, tags: ['热卖'], title: '阳光琥珀流光身体油 100ML', price: 860, thumb: IMG_CHERRY },
                    { id: 3005, tags: ['经典'], title: '珍华乌木奢润沐浴露 250ML', price: 650, thumb: IMG_DARK },
                    { id: 3006, tags: ['推荐'], title: '白麝香丝滑润肤乳 150ML', price: 780, thumb: IMG_CHERRY },
                ],
            },
            {
                id: 14,
                title: '香氛礼盒',
                subTitle: 'Fragrance Sets',
                image: IMG_CHERRY,
                list: [
                    { id: 3007, tags: ['礼遇'], title: '私人调香探索旅行礼盒 4x10ML', price: 1680, thumb: IMG_DARK },
                    { id: 3008, tags: ['热卖'], title: '珍华乌木香氛随行礼盒', price: 2850, thumb: IMG_DARK },
                    { id: 3009, tags: ['限定'], title: '暗樱撩情奢宠香氛礼盒', price: 3450, thumb: IMG_CHERRY },
                ],
            },
        ],
    },
    {
        id: 4,
        title: '礼盒',
        subTabs: [
            {
                id: 401,
                title: '限定系列',
                subTitle: 'Limited Edition',
                image: IMG_CHERRY,
                list: [
                    { id: 4001, tags: ['限定'], title: '勃艮第红丝绒高定限定礼盒', price: 3280, thumb: IMG_CHERRY },
                    { id: 4002, tags: ['限定'], title: '烟熏樱桃星品臻享限定礼盒', price: 3550, thumb: IMG_CHERRY },
                    { id: 4003, tags: ['限定'], title: '黑金挚爱香氛彩妆限定礼盒', price: 3980, thumb: IMG_DARK },
                ],
            },
            {
                id: 402,
                title: '经典礼盒',
                subTitle: 'Classic Gift Sets',
                image: IMG_DARK,
                list: [
                    { id: 4004, tags: ['经典'], title: '私人调香双支珍藏礼盒 2x50ML', price: 4800, thumb: IMG_DARK },
                    { id: 4005, tags: ['经典'], title: '珍华乌木正装与随行装礼盒', price: 2850, thumb: IMG_DARK },
                    { id: 4006, tags: ['经典'], title: '烈焰幻魅唇膏经典双支礼盒', price: 980, thumb: IMG_CHERRY },
                ],
            },
            {
                id: 403,
                title: '送她',
                subTitle: 'Gifts for Her',
                image: IMG_CHERRY,
                list: [
                    { id: 4007, tags: ['热卖'], title: '暗樱撩情香水与唇膏礼盒', price: 3450, thumb: IMG_CHERRY },
                    { id: 4008, tags: ['推荐'], title: '蜜桃琥珀四色眼影与唇膏礼盒', price: 1250, thumb: IMG_CHERRY },
                    { id: 4009, tags: ['新品'], title: '玫瑰秘境高定香氛礼盒', price: 3180, thumb: IMG_CHERRY },
                ],
            },
            {
                id: 404,
                title: '送他',
                subTitle: 'Gifts for Him',
                image: IMG_DARK,
                list: [
                    { id: 4010, tags: ['热卖'], title: '珍华乌木香氛与须后乳礼盒', price: 2980, thumb: IMG_DARK },
                    { id: 4011, tags: ['经典'], title: '暗影皮革男士香氛礼盒', price: 1980, thumb: IMG_DARK },
                    { id: 4012, tags: ['推荐'], title: '灰色香根草与男士理容礼盒', price: 2150, thumb: IMG_DARK },
                ],
            },
            {
                id: 405,
                title: '送自己',
                subTitle: 'Treat Yourself',
                image: IMG_DARK,
                list: [
                    { id: 4013, tags: ['礼遇'], title: '私人调香迷你探索 5 支礼盒', price: 1450, thumb: IMG_DARK },
                    { id: 4014, tags: ['推荐'], title: '阳光琥珀流光身体油礼盒', price: 1080, thumb: IMG_CHERRY },
                    { id: 4015, tags: ['新品'], title: '黑金气垫与星品唇膏随行礼盒', price: 1180, thumb: IMG_DARK },
                ],
            },
        ],
    },
    {
        id: 5,
        title: '眼镜',
        subTabs: [
            {
                id: 501,
                title: '太阳眼镜',
                subTitle: 'Sunglasses',
                image: IMG_DARK,
                list: [
                    { id: 5001, tags: ['经典'], title: '经典飞行员钛金属太阳镜', price: 3400, thumb: IMG_DARK },
                    { id: 5002, tags: ['新品'], title: '琥珀玳瑁框猫眼太阳镜', price: 3200, thumb: IMG_CHERRY },
                    { id: 5003, tags: ['热卖'], title: '标志性 T 字徽标粗框太阳镜', price: 3500, thumb: IMG_DARK },
                ],
            },
            {
                id: 502,
                title: '光学镜架',
                subTitle: 'Optical Frames',
                image: IMG_DARK,
                list: [
                    { id: 5004, tags: ['热卖'], title: '防蓝光经典方框光学镜架', price: 2950, thumb: IMG_DARK },
                    { id: 5005, tags: ['新品'], title: '复古圆框轻量钛金属镜架', price: 3300, thumb: IMG_DARK },
                    { id: 5006, tags: ['经典'], title: '黑金 T 字镜腿商务光学镜架', price: 3100, thumb: IMG_DARK },
                ],
            },
            {
                id: 503,
                title: '眼镜配饰',
                subTitle: 'Eyewear Care',
                image: IMG_DARK,
                list: [
                    { id: 5007, tags: ['推荐'], title: '压纹小牛皮磁吸便携眼镜盒', price: 1400, thumb: IMG_DARK },
                    { id: 5008, tags: ['新品'], title: '高定麂皮金属链条眼镜挂绳', price: 1150, thumb: IMG_DARK },
                ],
            },
        ],
    },
];

const CateGory = () => {
    const { cateTabs, setCateTabs } = useIndexContext();
    const [cateTab, setCateTab] = useState(2);

    useEffect(() => {
        if (cateTabs?.length === 0) {
            setCateTabs(DEFAULT_CATEGORIES);
        }
    }, [cateTabs?.length, setCateTabs]);

    const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
        setCateTab(newValue);
    };

    return (
        <div className={css.cate}>
            <AppBar position="static">
                <Tabs value={cateTab} onChange={handleChange} aria-label="category tabs" variant="fullWidth">
                    {cateTabs?.map((tab, index) => (
                        <Tab key={index} label={tab.title} />
                    ))}
                </Tabs>
            </AppBar>
            <CateContent key={cateTab} subTabs={cateTabs?.[cateTab]?.subTabs || []} />
        </div>
    );
};

export default CateGory;
