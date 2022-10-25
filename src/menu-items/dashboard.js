// assets
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'ordered-books',
            title: 'Ordered Books',
            type: 'item',
            url: '/ordered-books',
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
