import ensImage from './assets/image/svgs/ens-logo.svg';
import binanceImage from './assets/image/svgs/binance-logo.svg';

export const ethereumChain = 5
export const bscChain = 97;

/**
 * "5": ethereum chain
 * "97": bsc chain 
 *  */
export const contractAddresses = {
    [ethereumChain]: "0xD524ec8776987D4Ce7c5aAE5F92B92bc6b2AFf55",
    [bscChain]: "0x490DEc2ccBB7f3fe6EaB8690fEA3bab0404C1e0B"
}

export const chainNames = {
    [ethereumChain]: "ethereum",
    [bscChain]: "bsc"
}

export const rpcUrls = {
    [ethereumChain]: "https://goerli.infura.io/v3/",
    [bscChain]: "https://data-seed-prebsc-1-s3.binance.org:8545"
}

export const domainSuffixes = {
    [ethereumChain]: "eth",
    [bscChain]: "bnb"
}

export const chainIdHexes = {
    [ethereumChain]: "0x5",
    [bscChain]: '0x61'
}

export const domainLogoImages = {
    [ethereumChain]: ensImage,
    [bscChain]: binanceImage
}

export const domainNames = {
    [ethereumChain]: "ENS",
    [bscChain]: "BNB"
}