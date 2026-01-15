import * as React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Box,
  Typography,
  IconButton,
  Divider,
  Drawer,
} from "@mui/material";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate, useLocation, } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross1, } from 'react-icons/rx';
import useWindowDimensions from "../../hooks/useDimension";
import { useThemeStore, useCounterStore } from "../../utils/store";
import whiteLogoImage from '../../assets/image/logo_white_mode.png';
import darkLogoImage from '../../assets/image/logo_dark_mode.png';
import yellowSunImage from '../../assets/image/light_mode.png'
import darkSunImage from '../../assets/image/dark_mode.png'
import whiteCartImage from '../../assets/image/shopping_cart_white_mode.png'
import darkCartImage from '../../assets/image/shopping_cart_dark_mode.png'
import "./index.scss";


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const ElevationScroll = (props) => {
  const { width } = useWindowDimensions();
  const { children } = props;
  const [theme, setTheme] = useThemeStore();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: theme == 'dark-theme' ? trigger ? "#2A2A2A" : "#2A2A2A" : trigger ? "white" : "white",
      color: theme == 'dark-theme' ? "white" : "#2A2A2A",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: "none",
      padding: width > 500 ? "15px 20px" : "0",
    },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useCounterStore();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [theme, setTheme] = useThemeStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const toBuyPage = () => {
    navigate('/cart')
  }

  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
    theme == 'dark-theme' ? setTheme('day-theme') : setTheme('dark-theme')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const ThemeSwitchComponent = () => (
    <Box
      className="theme-switch-component"
      display={'flex'}
    >
      <Box
        sx={{
          padding: '4px 5px'
        }}
        alignItems='center'
        display={'flex'}
      >
        <img
          src={theme == 'dark-theme' ? darkSunImage : yellowSunImage}
          width={'22px'}
          height={'22px'}
        />
      </Box>
      <Box
        sx={{
          padding: '4px 10px',
          transform: 'rotate(180deg)',
        }}
        alignItems='center'
        display={'flex'}
        className='toggle-wrapper'
      >
        <Toggle
          defaultChecked={isSwitchOn}
          icons={false}
          onChange={() => switchTheme()}
          sx={{
            color: '#D9D9D9',
          }}
        />
      </Box>
    </Box>
  )

  const LogoComponent = () => (
    <Box
      display={'flex'}
    >
      <img
        src={theme == 'dark-theme' ? darkLogoImage : whiteLogoImage}
        style={{
          height: '41px'
        }}
      />
      <Typography
        color={theme == 'dark-theme' ? 'white' : 'black'}
        fontSize={"32px"}
        ml={'17px'}
        display={'flex'}
        fontFamily={'Inter'}
      >
        Domain Labs
      </Typography>
    </Box>
  )

  const drawer = (
    <Box
      sx={{ textAlign: 'center' }}
      m={'30px'}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        position={'relative'}
      >
        <LogoComponent />
        <Box
          position={'absolute'}
          right={0}
          top={'15px'}
        >
          <RxCross1
            color={theme == 'dark-theme' ? 'white' : 'black'}
            onClick={handleDrawerToggle}
          />
        </Box>
      </Box>

      <Box
        mt={'60px'}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          mx={'30px'}
          mb={'20px'}
        >
          <ThemeSwitchComponent />
          <Typography
            fontFamily={'Inter'}
            fontStyle={'normal'}
            fontWeight={'700'}
            fontSize={'24px'}
            lineHeight={'29px'}
            letterSpacing={'0.01em'}
            color={theme == 'dark-theme' ? 'white' : 'black'}
          >
            Theme
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: 'white',
          }}
        />

        <Box
          display={'flex'}
          mx={'30px'}
          my={'20px'}
          gap={'20px'}
        >
          <Box
            sx={{
              cursor: location.pathname == '/' ? 'not-allowed' : 'pointer',
            }}
            onClick={location.pathname == '/' ? () => { } : () => toBuyPage()}
          >
            {
              count.cart && count.cart > 0 ? (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  alignItems: 'center',
                  position: 'relative',
                  borderRadius: '50%',
                  background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)'
                }}>
                  <img
                    src={darkCartImage}
                    width={'22.64px'}
                    height={'22.64px'}
                  />

                  <span
                    style={{
                      position: 'absolute',
                      backgroundColor: '#F46B6B',
                      width: '13px', height: '13px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '10.3705px',
                      lineHeight: '13px',
                      color: 'white',
                      borderRadius: '50%',
                      top: '0',
                      right: '0'
                    }}
                  >
                    {count.cart}
                  </span>
                </Box>
              ) : (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  alignItems: 'center',
                  borderRadius: '50%',
                }}>
                  <img
                    src={
                      theme == 'dark-theme' ? darkCartImage : whiteCartImage
                    }
                    width={'22.64px'}
                    height={'22.64px'}
                  />
                </Box>
              )
            }
          </Box>

          <Typography
            fontFamily={'Inter'}
            fontStyle={'normal'}
            fontWeight={'700'}
            fontSize={'24px'}
            lineHeight={'29px'}
            letterSpacing={'0.01em'}
            color={theme == 'dark-theme' ? 'white' : 'black'}
          >
            Shopping Cart
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: 'white',
          }}
        />

        <Box
          className='connect-button-wrapper-mobile'
        >
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: 'full',
              largeScreen: 'full',
            }}
            chainStatus={{
              smallScreen: 'full',
              largeScreen: 'full',
            }}
          />
        </Box>
      </Box>
    </Box >
  );

  return (
    <React.Fragment
    >
      <ElevationScroll {...props}
        px={'10px !important'}
        class

      >
        <AppBar
          height={{ xs: '100px', sm: '60px' }}
          style={{
            padding: '0 20px !important',
          }}
        >
          <Toolbar
            p={'0px !important'}
            height={{ xs: '100px', sm: '60px' }}
            className='toolbar-container'
            sx={{
              position: 'relative',
              justifyContent: 'space-between',
            }}
          >
            <Box
              style={{
                backgroundRepeat: "no-repeat",
                zIndex: "9999",
                cursor: 'pointer',
              }}
              sx={{ display: 'flex' }}
              mr={'17px'}
              alignItems={'center'}
              onClick={() => navigate('/')}
            >
              <LogoComponent />
            </Box>

            <Box
              display={{ xs: 'flex', md: 'none' }}
              position={'absolute'}
              right={0}
              className='outline-menu-wrapper'
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                }}
                onClick={handleDrawerToggle}
              >
                <AiOutlineMenu />
              </IconButton>
            </Box>

            <Box component="nav">
              <Drawer
                container={container}
                anchor={'right'}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
                hideBackdrop={'false'}
              >
                {drawer}
              </Drawer>
            </Box>

            < Box
              sx={{
                right: { md: "10px", xs: "10px" },
              }}
              style={{
                zIndex: '10000'
              }}
              display={{
                xs: 'none', md: 'flex'
              }}
            >
              <Box
                mr={'10.93px'}
                display={{ xs: "block", sm: 'flex' }}
                sx={{
                  alignItems: 'center',
                  position: 'relative',
                  justifyContent: 'center',
                }}
                gap={'20px'}
              >
                <Box
                  flexDirection={'row'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <ThemeSwitchComponent />
                  <Box
                    sx={{
                      padding: '2px 0px 3px 15px',
                      cursor: location.pathname == '/' ? 'not-allowed' : 'pointer',
                    }}
                    onClick={location.pathname == '/' ? () => { } : () => toBuyPage()}
                    display={'flex'}
                  >
                    {
                      count.cart && count.cart > 0 ? (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            alignItems: 'center',
                            position: 'relative',
                            borderRadius: '50%',
                            background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                          }}
                        >
                          <img
                            src={darkCartImage}
                            width={'22.64px'}
                            height={'22.64px'}
                          />

                          <span
                            style={{
                              position: 'absolute',
                              backgroundColor: '#F46B6B',
                              width: '13px', height: '13px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '10.3705px',
                              lineHeight: '13px',
                              color: 'white',
                              borderRadius: '50%',
                              top: '0',
                              right: '0'
                            }}
                          >
                            {count.cart}
                          </span>
                        </Box>
                      ) : (
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          alignItems: 'center',
                          borderRadius: '50%',
                        }}>
                          <img
                            src={
                              theme == 'dark-theme' ? darkCartImage : whiteCartImage
                            }
                            width={'22.64px'}
                            height={'22.64px'}
                          />
                        </Box>
                      )
                    }
                  </Box>
                </Box>

                <Box
                  className="connect-button-wrapper"
                >
                  <ConnectButton
                    showBalance={false}
                    accountStatus={{
                      smallScreen: 'full',
                      largeScreen: 'full',
                    }}
                    chainStatus={{
                      smallScreen: 'full',
                      largeScreen: 'full',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment >
  );
}
export default Header;
