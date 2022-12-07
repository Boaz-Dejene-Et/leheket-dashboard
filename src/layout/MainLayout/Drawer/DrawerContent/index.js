import Navigation from './Navigation';
// import AdminNavigation from './AdminNavigation'
import SimpleBar from 'components/third-party/SimpleBar';
import { useSelector } from "react-redux";

const DrawerContent = () => {
    const role = useSelector((state) => state.menu.role);
    return (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation />
    </SimpleBar>
)};

export default DrawerContent;
