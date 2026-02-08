import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 自定义 hook：跳过初始化，只在依赖项更新时执行 effect
 * @param effect 要执行的副作用函数
 * @param deps 依赖项数组
 */
export const useEffectAfterMount = (effect: () => void, deps: any[]) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        effect();
    }, deps);
};

export const useToNav = () => {
    const navigate = useNavigate();
    return useCallback(
        (path: string) => {
            navigate(path);
        },
        [navigate]
    );
};