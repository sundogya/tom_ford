import css from "./index.module.less";

interface PageLoadingProps {
    text?: string;
}

export default function PageLoading({ text = "加载中..." }: PageLoadingProps) {
    return (
        <div className={css.loadingContainer}>
            <div className={css.squareBox}>
                <div className={css.squareFill} />
            </div>
            {text ? <span className={css.loadingText}>{text}</span> : null}
        </div>
    );
}
