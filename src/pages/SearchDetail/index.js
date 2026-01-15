import { Box, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "react-toggle/style.css";
import { useNetwork, } from "wagmi";
import { useCounterStore, useThemeStore } from '../../utils/store'
import {
    useBulkIsDomain,
    useReadDomainByName,
} from '../../utils/interact';
import {
    domainSuffixes,
} from "../../config";
import picImage from '../../assets/image/svgs/ens-logo.svg';
import blackVectorImage from "../../assets/image/vector_white_mode.png";
import whiteVectorImage from "../../assets/image/vector_dark_mode.png";
import blackBookmarkImage from "../../assets/image/bookmark_white_mode.png";
import blackOffshoppingImage from "../../assets/image/remove_shopping_cart_white_mode.png"

const SearchDetail = () => {
    const bulkIsDomain = useBulkIsDomain();
    const navigate = useNavigate()
    const { chain, } = useNetwork();
    const [results, setResults] = useState([])
    const [count, setCount] = useCounterStore();
    const [detailInfo, setDetailInfo] = useState([])
    const [theme, setTheme] = useThemeStore();
    const [detailName, setDetailName] = useState('')
    const [domainInfo, setDomainInfo] = useState({});
    const readDomainByName = useReadDomainByName(detailName);
    const { id } = useParams()
    const backHome = () => {
        navigate('/')
    }
    const gotoCartPage = () => {
        navigate('/cart')
    }
    const getReadDomainByName = async () => {
        if (readDomainByName.isLoading) return;
        console.log("read domain by name", readDomainByName.result);
        setDetailInfo(readDomainByName.result);
    }
    useEffect(() => {
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

    useEffect(() => {
        console.log("id: ", id);
        console.log("results: ", results);
        console.log("results.length: ", results.length);
        if (id && results.length > 0) {
            setDomainInfo(results[id])
            setDetailName(results[id].name);
        }
    }, [results, id])

    useEffect(() => {
        getReadDomainByName();
    }, [detailName]);

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
                        onClick={gotoCartPage}
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
                display={'flex'}
                mt={'60px'}
                sx={{ flexDirection: 'row' }}
            >
                <Box
                    sx={{
                        m: 1,
                        p: 1,
                        width: '100%',
                    }}
                    gap={'20px'}
                    display="flex"
                >
                    <Box
                        sx={{
                            padding: '25px 20px 10px 20px',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '16px',
                            marginBottom: '8px',
                            position: 'relative'
                        }}
                        backgroundColor={'#D2EBFF'}
                    >
                        <Box
                            justifyContent='center'
                            display='inline-flex'
                            gap={'5px'}
                            alignItems={'center'}
                            textAlign={'left'}
                            className='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                        >
                            <img
                                src={picImage}
                                width={'21px'}
                                height={'24px'}
                                style={{ marginLeft: '5px' }}
                            />
                            {
                                domainInfo?.status ? (
                                    <Typography
                                        sx={{ opacity: '0.5' }}
                                        fontSize={{ xs: '15px', md: '20px' }}
                                        fontWeight={'700'}
                                        variant="h5"
                                    >
                                        {domainInfo?.name}.{domainSuffixes[chain.id]}
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{ opacity: '1' }}
                                        fontSize={{ xs: '15px', md: '20px' }}
                                        fontWeight={'700'}
                                        variant="h5"
                                    >
                                        {domainInfo?.name}.{domainSuffixes[chain.id]}
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
                                    domainInfo?.status ? (
                                        <Typography
                                            sx={{ ml: '30px' }}
                                            fontSize={{ xs: '13px', md: '20px' }}
                                            color={'#868686'}
                                        >
                                            {'ENS Domain is registered already.'}
                                        </Typography>
                                    ) : (
                                        < Typography
                                            sx={{ ml: '30px' }}
                                            fontSize={{ xs: '15px', md: '20px' }}
                                        >
                                            {'ENS Domain is available.'}
                                        </Typography>
                                    )
                                }
                            </Box>
                        </Box>
                        {
                            detailInfo && (
                                <>
                                    <Box
                                        display="flex"
                                        sx={{
                                            mt: 1,
                                            width: '80%'
                                        }}
                                    >
                                        <Typography
                                            fontSize={{ xs: '15px', md: '20px' }}
                                        >
                                            owner:
                                        </Typography>
                                        <CopyToClipboard text={detailInfo.owner}
                                            onCopy={() => window.alert("copied")}>
                                            <Typography
                                                fontSize={{ xs: '15px', md: '20px' }}
                                                sx={{ ml: '10px' }}
                                            >
                                                {detailInfo.owner?.slice(0, 5) + "..." + detailInfo.owner?.slice(-5, -1)}
                                            </Typography>
                                        </CopyToClipboard>
                                    </Box>
                                    <Box
                                        display="flex"
                                        sx={{
                                            mt: 1,
                                            width: '80%'
                                        }}
                                    >
                                        <Typography
                                            fontSize={{ xs: '15px', md: '20px' }}
                                        >
                                            time:
                                        </Typography>
                                        <Typography
                                            fontSize={{ xs: '15px', md: '20px' }}
                                            sx={{ ml: '10px' }}
                                        >
                                            {
                                                (new Date(detailInfo.buyDate * 1000)).toString()
                                            }
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
                                            fontSize={{ xs: '15px', md: '20px' }}

                                        >
                                            expire time:
                                        </Typography>
                                        <Typography
                                            fontSize={{ xs: '15px', md: '20px' }}

                                            sx={{ ml: '10px' }}
                                        >
                                            {detailInfo.durationTime / (1000 * 24 * 60 * 60)}days
                                        </Typography>
                                    </Box>
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
                                        {
                                            domainInfo?.status ? (
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
                                                        src={blackOffshoppingImage}
                                                        style={{
                                                            opacity: '0.5',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                                    </Box>
                                </>
                            )

                        }

                    </Box>
                </Box>

            </Box>
        </Box >
    )
}
export default SearchDetail
