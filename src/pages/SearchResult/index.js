import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "react-toggle/style.css";
import { useNetwork, } from "wagmi";
import { useCounterStore, useThemeStore } from '../../utils/store'
import {
    domainSuffixes,
    domainLogoImages,
    domainNames,
} from "../../config";
import {
    useBulkIsDomain,
} from '../../utils/interact';

import blackVectorImage from "../../assets/image/vector_white_mode.png";
import whiteVectorImage from "../../assets/image/vector_dark_mode.png";
import whiteBookmarkImage from "../../assets/image/bookmark_dark_mode.png";
import blackBookmarkImage from "../../assets/image/bookmark_white_mode.png";
import blackOnshoppingImage from "../../assets/image/shopping_cart_white_mode.png"
import whiteOffShoppingImage from "../../assets/image/remove_shopping_cart_black_mode.png"
import blackOffshoppingImage from "../../assets/image/remove_shopping_cart_white_mode.png"

const SearchResult = () => {
    const bulkIsDomain = useBulkIsDomain();
    const { chain, } = useNetwork();
    const navigate = useNavigate()
    const [results, setResults] = useState([])

    const [count, setCount] = useCounterStore();
    const [detailInfo, setDetailInfo] = useState([])
    const [theme, setTheme] = useThemeStore();
    const [sale, setSale] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const addToCart = (id) => {
        console.log("id: ", id);

        let tempArray = Array.from(sale)
        console.log("temp array: ", tempArray);


        tempArray[id] = true;

        setSale(tempArray);
        let cart = count.cart;
        !cart ? cart = 0 : cart = cart;

        console.log("count: ", count);
        console.log("cart: ", cart);


        let tempArray1 = count.cartNames ? count.cartNames.slice() : []
        console.log("tempArray1: ", tempArray1);
        console.log({ id: id, name: results[id].name })
        console.log("current cart:   ", { ...count, cart: cart * 1 + 1, cartNames: tempArray1 })

        tempArray1.push({ id: id, name: results[id].name })
        setCount({ ...count, cart: cart + 1, cartNames: tempArray1 })
    }

    const removeFromCart = (id) => {
        let tempArray = Array.from(sale)
        tempArray[id] = false;
        setSale(tempArray)
        let cart = count.cart;
        console.log(cart)
        let tempArray1 = Array.from(count.cartNames)
        let temp;
        tempArray1.map((val, idx) => {
            if (val.id == id)
                temp = idx
        })
        tempArray1.slice(temp, 1)
        setCount({ ...count, cart: cart * 1 - 1, cartNames: tempArray1 })
    }
    const onClickToDetail = (id) => {
        if (results[id].status)
            navigate('/search-detail/' + `${id}`)
    }
    const backHome = () => {
        navigate('/')
    }

    const handleSelectOrDeselectAll = () => {
        // setIsSelectedAll(!isSelectedAll);

        console.log("results: ", results);
        let tempArray = Array.from(sale)

        let cartNames = [];
        results?.map((result, index) => {
            if (!result.status) {
                cartNames.push({id: index, name: result.name});
                tempArray[index] = true;

            }
        });

        setSale(tempArray);
        console.log("cart names: ", cartNames);
        console.log({
            ...count,
            cart: cartNames.length,
            cartNames: cartNames,
        });
        setCount({
            ...count,
            cart: cartNames.length,
            cartNames: cartNames,
        })
    }

    useEffect(() => {
        console.log("called")
        if (bulkIsDomain.isLoading) return;
        console.log("bulk is dmomain", bulkIsDomain.result);
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
                display={{ xs: 'block', sm: "flex" }}
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
                    mt={{ xs: '10px', sm: '0' }}
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
                        {` Search results`}
                    </Typography>
                </Box>
            </Box>
            <Box
                mt={'60px'}
                sx={{ flexDirection: 'row' }}
            >
                {
                    (results.length > 0) && (
                        <Box
                            display={'flex'}
                            justifyContent={'right'}
                        >
                            <Button
                                sx={{
                                    color: 'white',
                                    px: '20px',
                                    py: '10px',
                                    background: 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
                                    borderRadius: '8px',
                                    width: '150px',
                                }}
                                onClick={() => handleSelectOrDeselectAll()}
                            >
                                {
                                    !isSelectedAll ? `Select All` : `UnSelect All`
                                }
                            </Button>
                        </Box>
                    )
                }
                <Box
                    sx={{
                        marginTop: '20px',
                        gridTemplateColumns: {
                            lg: 'repeat(4, 1fr)',
                            md: 'repeat(3, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            xs: 'repeat(1, 1fr)',
                        },
                    }}
                    gap={'20px'}
                    display="grid"
                >
                    {
                        results?.map((result, id) => (
                            sale[id] ? (
                                <Box
                                    key={id}
                                    sx={{
                                        padding: '25px 20px 10px 20px',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '16px',
                                        marginBottom: '8px',
                                        background: 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)'
                                    }}
                                    onClick={() => onClickToDetail(id)}
                                >
                                    <Box
                                        justifyContent='center'
                                        display='inline-flex'
                                        gap={'5px'}
                                        alignItems={'center'}
                                        textAlign={'left'}
                                    >
                                        <img
                                            src={domainLogoImages[chain.id]}
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
                                            {result.name}.{domainSuffixes[chain.id]}
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
                                                    md: '1.3vw',
                                                    sm: '18px'
                                                }}
                                                color="white"
                                            >
                                                {`${domainNames[chain.id]} Domain is available.`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            float: 'right',
                                            gap: '20px',
                                            marginTop: '15px',
                                            bottom: '10px',
                                            right: '20px'
                                        }}>

                                        <img
                                            src={whiteBookmarkImage}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <img
                                            src={whiteOffShoppingImage}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => removeFromCart(id)}
                                        />

                                        {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    key={id}
                                    sx={{
                                        padding: '25px 20px 10px 20px',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '16px',
                                        marginBottom: '8px',
                                    }}
                                    onClick={() => onClickToDetail(id)}
                                    backgroundColor={'#D2EBFF'}
                                >
                                    <Box
                                        justifyContent='center'
                                        display='inline-flex'
                                        gap={'5px'}
                                        alignItems={'center'}
                                        textAlign={'left'}
                                    >
                                        <img
                                            src={domainLogoImages[chain.id]}
                                            width={'21px'}
                                            height={'24px'}
                                            style={{ marginLeft: '5px' }}
                                        />
                                        {
                                            result.status ? (
                                                <Typography
                                                    sx={{ opacity: '0.5' }}
                                                    fontSize={{ md: '1.8vw', sm: '25px' }}
                                                    fontWeight={'700'}
                                                    variant="h5"
                                                >
                                                    {result.name}.{domainSuffixes[chain.id]}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    sx={{ opacity: '1' }}
                                                    fontSize={{ md: '1.8vw', sm: '25px' }}
                                                    fontWeight={'700'}
                                                    variant="h5"
                                                >
                                                    {result.name}.{domainSuffixes[chain.id]}
                                                </Typography>
                                            )
                                        }
                                    </Box>
                                    <Box>
                                        <Box
                                            display="flex"
                                            sx={{ width: 1 }}
                                            justifyContent="space-between"
                                        >
                                            {
                                                result.status ? (
                                                    <Typography
                                                        sx={{ ml: '30px' }}
                                                        fontSize={{ md: '1.3vw', sm: '18px' }}
                                                        color={'#868686'}
                                                    >
                                                        {'This Domain is registered already.'}
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        sx={{ ml: '30px' }}
                                                        fontSize={{ md: '1.3vw', sm: '18px' }}
                                                    >
                                                        {'This Domain is available.'}
                                                    </Typography>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            float: 'right',
                                            gap: '20px',
                                            marginTop: '15px',
                                            bottom: '10px',
                                            right: '20px',
                                        }}
                                    >
                                        {
                                            result.status ? (
                                                <>
                                                    <img src={blackBookmarkImage} />
                                                    <img src={blackOffshoppingImage} />
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        src={blackBookmarkImage}
                                                        style={{
                                                            opacity: '0.5',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                    <img
                                                        src={blackOnshoppingImage}
                                                        style={{
                                                            opacity: '0.5',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => addToCart(id)}
                                                    />
                                                </>
                                            )
                                        }
                                        {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                                    </Box>
                                </Box>
                            )
                        ))
                    }
                </Box>
                {
                    detailInfo?.name ? (
                        <Box
                            sx={{
                                p: 1,
                                m: 1,
                                ml: 10,
                                width: '80%'
                            }}
                        >
                            <Box
                                display="flex"
                                sx={{ mt: 1, width: '80%' }}
                            >
                                <Typography
                                    variant="h5">
                                    name:
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{ ml: '10%' }}
                                >
                                    {detailInfo.name}
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                sx={{ mt: 1, width: '80%' }}
                            >
                                <Typography v
                                    ariant="h5"
                                >
                                    owner:
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{ ml: '10%' }}>
                                    {detailInfo.owner}
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                sx={{
                                    mt: 1,
                                    width: '80%'
                                }}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    time:
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{ ml: '10%' }}
                                >
                                    {(new Date(detailInfo.buyDate * 1000)).toString()}
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                sx={{
                                    mt: 1,
                                    width: '80%'
                                }}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    expire time:
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{ ml: '10%' }}
                                >
                                    {detailInfo.durationTime / (1000 * 24 * 60 * 60)}days
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        ''
                    )
                }
            </Box>
        </Box >
    )
}
export default SearchResult