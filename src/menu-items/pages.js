// assets
import { LoginOutlined, ProfileOutlined, MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    MessageOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'additional',
    title: 'Additional',
    type: 'group',
    children: [
        {
            id: 'notification',
            title: 'notification',
            type: 'item',
            url: '/notification',
            icon: icons.MessageOutlined,
            // target: true,
            breadcrumbs: false
        }
    ]
};

export default pages;
