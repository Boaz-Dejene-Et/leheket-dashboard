// assets
import { DashboardOutlined, UserOutlined, ReadOutlined, DollarCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UserOutlined,
    ReadOutlined,
    DollarCircleOutlined,
    AppstoreAddOutlined
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
            icon: icons.AppstoreAddOutlined,
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
            icon: icons.DollarCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'books',
            title: 'Books',
            type: 'item',
            url: '/books',
            icon: icons.ReadOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
