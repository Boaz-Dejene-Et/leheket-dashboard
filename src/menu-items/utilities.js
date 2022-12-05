import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    PlusOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';

const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    PlusOutlined,
    UsergroupAddOutlined
};

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'add-book',
            title: 'Add Book',
            type: 'item',
            url: '/add_book',
            icon: icons.PlusOutlined
        },
        {
            id: 'add-employee',
            title: 'Add Employee',
            type: 'item',
            url: '/add_employee',
            icon: icons.UsergroupAddOutlined
        }
    ]
};

export default utilities;
