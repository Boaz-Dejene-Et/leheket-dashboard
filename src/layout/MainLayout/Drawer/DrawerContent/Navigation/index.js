import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from "react-redux";


const Navigation = () => {
    const role = useSelector((state) => state.menu.role);
    const navGroups = menuItem.items.map((item) => {
        if(role !== "Admin") {
            let arr = []
            if(item.id === "group-dashboard") {
                arr = item.children.filter(function(item) {
                    return item.id !== "employees"
                })
            } else {
                arr = item.children.filter(function(item) {
                    return item.id !== "add-employee"
                })
            }
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} children={arr} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            
                        </Typography>
                    );
            }
        } else if(role === "Admin") {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} children={item.children} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            
                        </Typography>
                    );
            }
        }
        // else {
        //     switch (item.type) {
        //         case 'group':
        //             return <NavGroup key={item.id} item={item} />;
        //         default:
        //             return (
        //                 <Typography key={item.id} variant="h6" color="error" align="center">
                            
        //                 </Typography>
        //             );
        //     }
        // }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
