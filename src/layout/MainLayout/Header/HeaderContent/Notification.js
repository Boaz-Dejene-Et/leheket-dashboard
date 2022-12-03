import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { BellOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState([]);
    const [messageAmount, setMessageAmount] = useState()
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    const GetCommentsFromContactUs = () => {
        let query = `query MyQuery($limit: Int = 4) {
            contactUs(limit: $limit) {
              email
              id
              message
              name
              created_at
            }
            contactUs_aggregate {
              aggregate {
                count
              }
            }
          }`

        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            // if(res.data?.data?.contactUs) {
            setMessage(res.data?.data?.contactUs)
            setMessageAmount(res.data?.data?.contactUs_aggregate?.aggregate?.count)
            // }
        }).catch((err) => {
            console.log(err)
            console.log(err.response?.data)
        })
    }

    useEffect(()=>{
        GetCommentsFromContactUs()
    },[])

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge badgeContent={messageAmount} color="primary">
                    <BellOutlined />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.customShadows.z1,
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285
                                }
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Notification"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                            }
                                        }}
                                    >
                                        {message && message.map((mes)=>{
                                            return (
                                                <Link to="/notification" key={mes.id}>
                                                    <>
                                                        <ListItemButton key={mes.id}>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    sx={{
                                                                        color: 'primary.main',
                                                                        bgcolor: 'primary.lighter'
                                                                    }}
                                                                >
                                                                    <MessageOutlined />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="h6">
                                                                        <Typography component="span" variant="subtitle1">
                                                                            {mes.name}
                                                                        </Typography>{' '}
                                                                        {mes.email}
                                                                    </Typography>
                                                                }
                                                                secondary={mes.created_at.slice(0, 10)}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="caption" noWrap>
                                                                    {mes.created_at.slice(11,16)}
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItemButton>
                                                        <Divider />
                                                    </>
                                                </Link>
                                            )
                                        })}
                                        <Link to="/notification">
                                            <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6" color="primary">
                                                            View All
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
