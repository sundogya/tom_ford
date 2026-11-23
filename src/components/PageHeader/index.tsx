import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowLeftSharp } from "@mui/icons-material";
import css from "./index.module.less";

interface PageHeaderProps {
    title: string;
    onBack?: () => void;
    rightSlot?: ReactNode;
}

export default function PageHeader({ title, onBack, rightSlot }: PageHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }
        navigate(-1);
    };

    return (
        <header className={css.header}>
            <div className={css.backBtn} onClick={handleBack}>
                <KeyboardArrowLeftSharp />
            </div>
            <span className={css.headerTitle}>{title}</span>
            <div className={css.rightSlot}>{rightSlot}</div>
        </header>
    );
}
