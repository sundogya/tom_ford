import { memo } from "react";
import css from "../style/index.module.less";

type BannerResourceProps = {
    toNav: (path: string) => void;
};

const BannerResource = ({ toNav }: BannerResourceProps) => {
    return (
        <>
            <div className={css.bannerResource}>
                <div className={css.bannerLeft}>
                    <span>MEMBER BENEFIT</span>
                    <span className={css.leftSmall}>社群私享好礼</span>
                    <span>加入专属社群福利 解锁私享加赠礼</span>
                    <span className={`${css.leftSmall} ${css.toResource}`} onClick={() => toNav(`/banner/resource`)}>
                        立即前往
                    </span>
                </div>
                <div className={css.bannerRight}>
                    <img
                        src="https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px"
                        alt="banner_resource"
                    />
                </div>
            </div>
        </>
    );
};

export default memo(BannerResource);
