import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HelpButton from '../help/HelpButton';
import DarkModeButton from '../darkmode/DarkModeButton';
import {Link} from 'react-router-dom';
import {ButtonGroup, CssBaseline, Slide, useScrollTrigger, useTheme} from "@mui/material";

const logo = 'src/assets/images/channels4_profile.jpg';
const top = '-6px';

// Function to hide AppBar on scroll
function HideOnScroll(props: Readonly<{ children: React.ReactElement }>) {
    const {children} = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const ResponsiveAppBar: React.FC = () => {
    const theme = useTheme();

    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll>
                <AppBar position="sticky" sx={{height: '44px', bgcolor: theme.palette.primary.main}}> {/*TODO color*/}
                    <Toolbar
                        disableGutters
                        variant="dense"
                        sx={{
                            padding: '0px',
                            justifyContent: 'space-between',
                            width: '98vw',  // Set the width to 90% of the AppBar
                            margin: '0 auto' // Center the toolbar within the AppBar
                        }}>

                        {/* Logo and Text for Large Screens */}
                        <Box sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center'}}>
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    height: '28px',
                                    width: 'auto',
                                    marginRight: '8px',
                                    alignSelf: 'center',
                                    marginTop: top,
                                }}
                            />
                            <Typography
                                variant="h5"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    textDecoration: 'none',
                                    marginTop: top,
                                    color: theme.palette.primary.contrastText
                                }}>
                                TLA
                            </Typography>
                            <Typography sx={{
                                fontSize: "0.7em",
                                lineHeight: 'normal',
                                marginTop: top,
                                color: theme.palette.primary.contrastText
                            }}>
                                powered by Fraunhofer IEM
                            </Typography>
                        </Box>

                        {/* Right-aligned buttons */}
                        <ButtonGroup sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <HelpButton/>
                            <DarkModeButton/>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
};

export default ResponsiveAppBar;
