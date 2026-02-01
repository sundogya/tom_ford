import { memo } from "react";
import css from "../style/index.module.less";
import type { VipInfo } from "../mine.types";

type PersonInfoProps = {
    vipInfo: VipInfo;
    toNav: (path: string) => void;
};

const PersonInfo = ({ vipInfo, toNav }: PersonInfoProps) => {
    return (
        <>
            <div className={css.personInfo}>
                <div className={css.info}>
                    <span className={css.hello}>HELLO</span>
                    <span className={css.toInformation} onClick={() => toNav(`/mine/information`)}>
                        完善个人信息
                    </span>
                </div>
                <div className={css.vipInfo}>
                    <div className={css.vipLeft}>
                        <span className={css.currentLevel}>{vipInfo.vipLevel}</span>
                        <span className={css.currentPoints}>{vipInfo.points}积分</span>
                    </div>
                    <div className={css.vipRight}>
                        <span className={css.nextLevelName}>{vipInfo.nextLevelName}</span>
                        <span className={css.nextLevelPoints}>年累计消费{vipInfo.nextLevelPoints}即可升级</span>
                    </div>
                </div>
                <div className={css.vipAdvantage}>
                    <span onClick={() => toNav(`/mine/vip`)}>会员权益</span>
                    <span onClick={() => toNav(`/mine/coupons`)}>我的礼券</span>
                </div>
            </div>
        </>
    );
};

export default memo(PersonInfo);
