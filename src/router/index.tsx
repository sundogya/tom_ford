import { createBrowserRouter, Navigate } from 'react-router-dom';
import home from './modules/home';
import mine from './modules/mine';
import index from './modules/index';
import order from './modules/order';
const router = createBrowserRouter([
    { path: '/', element:<Navigate to="/index/category" /> },
    ...home,
    ...mine,
    ...index,
    ...order
]);
export { router };
export default router;