import { createBrowserRouter, Navigate } from 'react-router-dom';
import home from './modules/home';
import mine from './modules/mine';
import index from './modules/index';
const router = createBrowserRouter([
    { path: '/', element:<Navigate to="/index/category" /> },
    ...home,
    ...mine,
    ...index,
]);
export { router };
export default router;