import React, { useEffect, useState } from "react"
import { Box, Grid, Typography, Button, Divider, TextField, MenuItem } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    useNetwork,
    useAccount,
} from 'wagmi';
import { useCounterStore, useThemeStore } from "../../utils/store";
import {
    useBulkBuyDomain,
    useBulkIsDomain,
} from '../../utils/interact'
import {
    domainSuffixes,
} from '../../config';
import blackVectorImage from "../../assets/image/vector_white_mode.png";
import whiteVectorImage from "../../assets/image/vector_dark_mode.png";
import whiteBookmarkImage from "../../assets/image/bookmark_dark_mode.png";
import whiteOffShoppingImage from "../../assets/image/remove_shopping_cart_black_mode.png"
import picImage from '../../assets/image/svgs/ens-logo.svg';
import timerImage from "../../assets/image/timer.png"
const secondsInDay = 24 * 60 * 60 * 1000;

const Cart = () => {
    const bulkIsDomain = useBulkIsDomain();
    const { chain, } = useNetwork();
    const { address, } = useAccount();
    const [results, setResults] = useState();
    const [count, setCount] = useCounterStore();
    const [price, setPrice] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const navigate = useNavigate();
    const [theme, setTheme] = useThemeStore();
    const [toggle, setToggle] = useState([])
    const [duration, setDuration] = React.useState([]);
    const [discount, setDiscount] = React.useState()
    const [currentTime, setCurrentTime] = React.useState()
    const [result, setResult] = useState([]);
    const bulkBuyDomain = useBulkBuyDomain(
        results?.map(item => item.name),
        duration.map(item => item * secondsInDay),
        totalValue
    );

    const options = [
        { label: '1 Month', value: 30 },
        { label: '2 Month', value: 60 },
        { label: '3 Month', value: 90 },
        { label: '6 Month', value: 180 },
        { label: '1 Year', value: 365 },
        { label: '3 Years', value: 1095 },
        { label: '5 Years', value: 1825 }
    ]

    const backHome = () => {
        navigate('/search-result')
    }
    const applyDiscount = (val, length) => {
        let totalPrice = Math.floor(val * 100000) / 100000;
        let tempDiscount = 100;
        if (length >= 50) {
            tempDiscount = 50;
        }
        else if (length >= 20) {
            tempDiscount = 80;
        }
        else if (length >= 10) {
            tempDiscount = 90;
        }
        return (totalPrice * tempDiscount) / 100
    }
    const calculatePrice = (name, time) => {
        let length = name.length;
        let priceTemp;
        if (length > 0)
            switch (length) {
                case 3:
                    priceTemp = 5;
                    break;
                case 4:
                    priceTemp = 4;
                    break;
                default:
                    priceTemp = 3;
            }
        priceTemp = 0.0041 * time / 365;
        return priceTemp;
    }
    const buyDomain = async () => {
        if (bulkBuyDomain.isLoading) return;

        try {
            bulkBuyDomain.buyFunction?.();
        } catch (err) {
            console.log("error in write: ", err);
        }

        if (bulkIsDomain.isSuccess) {
            const postObject = {
                wallet: address,
                buyCount: results.length,
                buyMoney: totalValue,
            }

            if (bulkBuyDomain.isSuccess) {
                console.log("post object: ", postObject)
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/buys/write-log/`, postObject);
            }
        }
    }

    const timeSelect = (id, idx) => {
        let tempArray = Array.from(duration)
        tempArray[idx] = options[id].value;
        setDuration(tempArray);
        let tempCurrentTime = Array.from(currentTime)
        tempCurrentTime[idx] = options[id].label
        setCurrentTime(tempCurrentTime)
        let priceTempArray = Array.from(price);
        let toggleArray = toggle.slice();
        toggleArray[idx] = false
        setToggle(toggleArray)
        let length = results[idx].name.length;
        if (length > 0)
            switch (length) {
                case 3:
                    priceTempArray[idx] = 0.5;
                    break;
                case 4:
                    priceTempArray[idx] = 0.125;
                    break;
                default:
                    priceTempArray[idx] = 0.003;
            }
        let time = options[id].value;
        // setTime(options[id].val)\

        priceTempArray[idx] = 0.0041 * time / 365;
        setPrice(priceTempArray)
        let totalPrice = 0;
        for (let i = 0; i < priceTempArray.length; i++) {
            if (priceTempArray[i])
                totalPrice += priceTempArray[i]
        }
        totalPrice = Math.floor(totalPrice * 100000) / 100000;
        let tempDiscount = 100;
        if (priceTempArray.length >= 50) {
            tempDiscount = 50;
        }
        else if (priceTempArray.length >= 20) {
            tempDiscount = 80;
        }
        else if (priceTempArray.length >= 10) {
            tempDiscount = 90;
        }
        setTotalValue(totalPrice * tempDiscount / 100)
        setDiscount(100 - tempDiscount);
    }

    useEffect(() => {
        if (bulkIsDomain.isLoading) return;
        console.log("bulk is dmomain", bulkIsDomain.result);
        setResult(bulkIsDomain.result);
        if (bulkIsDomain.status) {
            let tempArray = []
            {
                bulkIsDomain.status && count.names?.map((name, id) => {
                    tempArray[id] = {};
                    tempArray[id].status = bulkIsDomain?.result[id];
                    tempArray[id].name = name;
                })
                setResults(tempArray);
            }
        }
    }, [count, bulkIsDomain.isLoading])

    useEffect(() => {
        console.log("cart page result: ", result);
        if (result) {
            let tempArray = [];
            let currentTime = [];
            let tempDuration = [];
            let initialCost = 0;
            let tempPrice = [];
            console.log("count.cartNames: ", count);

            {
                count.cartNames?.map((name, id) => {
                    console.log("name", name)
                    tempArray[id] = {};
                    tempArray[id].status = result[id];
                    currentTime[id] = options[4].label;
                    tempArray[id].name = name.name;
                    tempDuration[id] = options[4].value;
                    console.log(name.name, options[4].value)

                    tempPrice[id] = calculatePrice(name.name, options[4].value);
                    initialCost += calculatePrice(name.name, options[4].value);
                })

                let nameLength = count.cartNames ? count.cartNames.length : 0;
                initialCost = applyDiscount(initialCost, nameLength);
                setTotalValue(initialCost)
                setResults(tempArray);
                setCurrentTime(currentTime);
                setPrice(tempPrice)
                setDuration(tempDuration);
            }
        }
    }, [result])

    return (
        <Box
            pt={20}
            px={{ xs: '30px', sm: '40px' }}
            sx={{
                backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
                minHeight: 'calc(100vh - 328px)'
            }}
        >
            <Box
                display={{ xs: 'block', md: 'flex' }}
                sx={{
                    justifyContent: "space-between"
                }}
            >
                <Box
                    display={{ md: 'block', lg: "flex" }}
                    alignItems={'center'}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <img
                            src={theme == 'dark-theme' ? whiteVectorImage : blackVectorImage}
                            width={'15.5px'}
                            height={'31px'}
                            style={{ cursor: 'pointer' }}
                            onClick={backHome}
                        />
                        <Typography
                            fontSize={{
                                md: "24px",
                                xs: "18px"
                            }}
                            fontWeight={700}
                            top={{
                                md: 30,
                                xs: 70
                            }}
                            ml={{ xs: '20px', sm: '34.5px' }}
                            left={{
                                md: 200,
                                xs: 20
                            }}
                            sx={{
                                fontFamily: "Inter",
                                fontWeight: '600',
                                color: theme == 'dark-theme' ? 'white' : 'black',
                                fontSize: '40px',
                                lineHeight: '48px',
                                letterSpacing: '-0.01rem'

                            }}
                            onClick={backHome}
                        >
                            Search Result
                        </Typography>
                    </Box>

                    <Box
                        display={'flex'}
                        mt={{ xs: '10px', lg: '0' }}
                    >
                        <Typography
                            fontSize={{
                                md: "24px",
                                xs: "18px"
                            }}
                            fontWeight={700}
                            top={{
                                md: 30,
                                xs: 70
                            }}
                            left={{
                                md: 200,
                                xs: 20
                            }}
                            sx={{
                                fontSize: '14px',
                                lineHeight: '17px',
                                color: theme == 'dark-theme' ? 'white' : '#7A7A7A',
                                marginLeft: '20px'
                            }}
                        >
                            {`Domain Labs  > `}
                        </Typography>
                        <Typography
                            ml={'5px'}
                            sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                lineHeight: '17px',
                                paddngRight: '5px',
                                textDecoration: 'underline',
                                background: 'linear-gradient(87.95deg, #4BD8D8 -3.28%, #146EB4 106.25%)',
                                '-webkit-background-clip': 'text',
                                'text-decoration-line': 'underline',
                                '-webkit-text-fill-color': 'transparent',
                                'background-clip': 'text',
                                'text-fill-color': 'transparent',
                            }}
                        >
                            {` Shopping Cart`}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    mt={{ xs: '40px', md: '0px' }}
                >
                    <Typography
                        color={theme == 'dark-theme' ? 'white' : 'black'}
                        sx={{
                            letterSpacing: '-0.01em',
                            fontWeight: '700',
                            fontSize: '28px',
                            lineHeight: '34px',
                        }}
                    >
                        Total Cost
                    </Typography>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        py={'8px'}
                        mt={"7px"}
                        sx={{
                            fontSize: "16px",
                            lineHeight: '19px',
                            letterSpacing: '-0.01em',
                            color: theme == 'dark-theme' ? 'white' : '#7A7A7A',
                            width: '325px',
                            borderBottom: '0.5px solid #D3D3D3'
                        }}
                    >
                        <Typography>
                            Total ETH
                        </Typography>
                        <Typography>
                            {totalValue}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        py={'8px'}
                        sx={{
                            fontSize: "16px",
                            lineHeight: '19px',
                            letterSpacing: '-0.01em',
                            color: theme == 'dark-theme' ? 'white' : '#7A7A7A',
                            width: '325px',
                            borderBottom: '0.5px solid #D3D3D3'
                        }}
                    >
                        <Typography>
                            Total USD
                        </Typography>
                        <Typography>
                            {totalValue * 1221}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        py={'8px'}
                        sx={{
                            fontSize: "16px",
                            lineHeight: '19px',
                            letterSpacing: '-0.01em',
                            color: theme == 'dark-theme' ? 'white' : '#7A7A7A',
                            width: '325px',
                            borderBottom: '0.5px solid #D3D3D3'
                        }}
                    >
                        <Typography>
                            Gas Price(Gwei)
                        </Typography>
                        <Typography>
                            13.07
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        py={'8px'}
                        sx={{
                            fontSize: "24px",
                            lineHeight: '19px',
                            letterSpacing: '-0.01em',
                            color: theme == 'dark-theme' ? 'white' : '#7A7A7A',
                            width: '325px',
                        }}
                    >
                        <Typography
                            fontSize={"24px"}
                            fontWeight={'700'}
                        >
                            Grand total($)
                        </Typography>
                        <Typography
                            fontSize={"24px"}
                            fontWeight={'700'}
                        >
                            {totalValue * 1221}
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            sx={{
                                background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                                borderRadius: '12px',
                                marginTop: '12px',
                                color: 'white',
                                // float: 'right',
                                px: '40px',
                            }}
                            onClick={() => buyDomain()}
                        >
                            Proceed To Registration
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '40px'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '19px',
                        letterSpacing: '-0.01em',
                        color: '#7A7A7A'
                    }}
                >
                    This domains will be registered to
                </Typography>
                <Box
                    sx={{
                        background: 'white',
                        boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
                        borderRadius: '40px',
                        height: '51px',
                        marginTop: '22px',
                        maxWidth: "670px",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        fontSize={'20px'}
                        lineHeight={'24px'}
                        fontWeight={'600'}
                        color={'black'}
                        display={{ xs: 'none', md: 'flex', }}
                    >
                        Le8429482ldjfie82048fjw8jfue8492j204kd0282jdurks
                    </Typography>


                    <CopyToClipboard text={'Le8429482ldjfie82048fjw8jfue8492j204kd0282jdurks'}
                        onCopy={() => window.alert("copied")}>
                        <Typography
                            fontSize={'20px'}
                            lineHeight={'24px'}
                            fontWeight={'600'}
                            color={'black'}
                            display={{ xs: 'flex', md: 'none', }}
                        >
                            {'Le8429482ldjfie82048fjw8jfue8492j204kd0282jdurks'.slice(0, 10) + "..." + 'Le8429482ldjfie82048fjw8jfue8492j204kd0282jdurks'.slice(-10, -1)}
                        </Typography>
                    </CopyToClipboard>

                </Box>
                <Box
                    my={'40px'}
                    sx={{
                        width: '100%',
                        gridTemplateColumns: {
                            lg: 'repeat(4, 1fr)',
                            md: 'repeat(3, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            xs: 'repeat(1, 1fr)'
                        },
                    }}
                    gap={'20px'}
                    display="grid"
                >
                    {
                        results?.map((val, idx) => {
                            return (
                                <Box
                                    key={idx}
                                    sx={{
                                        padding: '25px 20px 10px 20px',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '16px',
                                        position: 'relative',
                                        width: 'calc(100%-60px)/3',
                                        marginBottom: '8px',
                                        background: 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)'
                                    }}
                                >
                                    <Box
                                        justifyContent='center'
                                        display='inline-flex'
                                        gap={'5px'}
                                        alignItems={'center'}
                                        textAlign={'left'}
                                    >
                                        <img
                                            src={picImage}
                                            width={'21px'}
                                            height={'24px'}
                                            style={{
                                                marginLeft: '5px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Typography
                                            sx={{ opacity: '1' }}
                                            fontSize={{
                                                md: '1.8vw',
                                                sm: '25px'
                                            }}
                                            fontWeight={'700'}
                                            variant="h5"
                                            color="white"
                                        >
                                            {val.name}.{domainSuffixes[chain.id]}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box
                                            display="flex"
                                            sx={{ width: 1 }}
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                sx={{ ml: '30px' }}
                                                fontSize={{
                                                    md: '1vw',
                                                    sm: '18px'
                                                }}
                                                color="white"
                                            >
                                                {'ETH extension'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                            marginTop: '8px',
                                            alignItems: 'center',
                                            position: "relative"
                                        }}
                                    >
                                        {
                                            toggle[idx] ? (
                                                <Box
                                                    sx={{
                                                        background: 'white',
                                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                                        borderRadius: '16px',
                                                        width: '123px',
                                                        top: '0px',
                                                        position: 'absolute',
                                                        zIndex: '1',
                                                        paddingLeft: '10px'
                                                    }}>
                                                    {
                                                        options.map((val, id) => (
                                                            <Box
                                                                key={id}
                                                                sx={{
                                                                    width: '123px',
                                                                    height: '24px',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    paddingLeft: '10px',
                                                                    cursor: 'pointer'

                                                                }}
                                                                onClick={() => timeSelect(id, idx)}
                                                            >
                                                                <img
                                                                    src={timerImage}
                                                                    width={"9px"}
                                                                    height={'10.5px'}
                                                                />
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '12px',
                                                                        lineHeight: '15px',
                                                                        /* identical to box height */
                                                                        fontWeight: '400',
                                                                        letterSpacing: '-0.01em',
                                                                        marginLeft: '9.5px',
                                                                        color: '#626262',

                                                                    }}
                                                                >
                                                                    {options[id].label}
                                                                </Typography>
                                                            </Box>
                                                        ))
                                                    }
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        background: '#FFFFFF',
                                                        width: '123px',
                                                        height: '24px',
                                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                                        borderRadius: '16px',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        paddingLeft: '10px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {
                                                        let toggleArray = toggle.slice();
                                                        toggleArray[idx] = true;
                                                        setToggle(toggleArray)
                                                    }}
                                                >
                                                    <img
                                                        src={timerImage}
                                                        width={"9px"}
                                                        height={'10.5px'}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '15px',
                                                            /* identical to box height */
                                                            fontWeight: '400',
                                                            letterSpacing: '-0.01em',
                                                            marginLeft: '9.5px',
                                                            color: '#626262',

                                                        }}
                                                    >
                                                        {currentTime[idx]}
                                                    </Typography>
                                                </Box>
                                            )
                                        }

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                float: 'right',
                                                gap: '20px',
                                                marginTop: '15px',
                                                bottom: '10px',
                                                right: '20px'
                                            }}
                                        >
                                            <img
                                                src={whiteBookmarkImage}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <img
                                                src={whiteOffShoppingImage}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshopping}/>*/}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default Cart