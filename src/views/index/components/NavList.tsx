import { memo } from "react";
import { KeyboardArrowRightSharp } from "@mui/icons-material";
import css from "../style/index.module.less";
import type { NavItem } from "../mine.types";

type NavListProps = {
    toNav: (path: string) => void;
    navList: Array<NavItem>;
};

const NavList = ({ toNav, navList }: NavListProps) => {
    return (
        <>
            <div className={css.navList}>
                {navList.map((item) => (
                    <div key={item.path} className={css.navItem} onClick={() => toNav(item.path)}>
                        <span>{item.name}</span>
                        <div className={css.navRight}>
                            {item.desc ? <span>{item.desc}</span> : null}
                            <KeyboardArrowRightSharp />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default memo(NavList);
