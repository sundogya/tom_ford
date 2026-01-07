import type { RouteObject } from 'react-router-dom';
type MyRoute = RouteObject & {
    meta?: {
        title?: string;
        [key: string]: any;
    };
};
export type { MyRoute };