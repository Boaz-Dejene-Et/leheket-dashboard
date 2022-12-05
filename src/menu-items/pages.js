import { MessageOutlined } from '@ant-design/icons';

const icons = {
    MessageOutlined
};

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
