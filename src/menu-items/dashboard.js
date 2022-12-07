import { DashboardOutlined, UserOutlined, ReadOutlined, DollarCircleOutlined, AppstoreAddOutlined, TeamOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { store } from '../store/index'

const icons = {
    DashboardOutlined,
    UserOutlined,
    ReadOutlined,
    DollarCircleOutlined,
    AppstoreAddOutlined,
    TeamOutlined
};

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
            id: 'employees',
            title: 'Employees',
            type: 'item',
            url: '/employees',
            icon: icons.TeamOutlined,
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


// const CheckRole = () => {
//     // const role = useSelector((state) => state.menu.role);
//     if(store.getState().menu.role === "Admin") {
//         dashboard?.children.push(
//             {
//                 id: 'employees',
//                 title: 'Employees',
//                 type: 'item',
//                 url: '/employees',
//                 icon: icons.TeamOutlined,
//                 breadcrumbs: false
//             });
//     } else {
//         // dashboard?.children.splice(1, 1);
//         dashboard?.children.filter((item) => {
//             return item.id !== "employees"
//         })
//     }
//     console.log("TATATA", dashboard.children, store.getState())
// }

// CheckRole()

export default dashboard;
