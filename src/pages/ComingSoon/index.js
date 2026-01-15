import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCounterStore, useThemeStore } from "../../utils/store";
import { toast } from "react-toastify";
import axios from "axios";
import { useAccount } from "wagmi";
import comingSoonPageBgDesktop from "../../assets/image/coming-soon-bg-desktop.png";
import comingSoonPageBgMobile from "../../assets/image/coming-soon-bg-mobile.png";
import comingSoonPageBgBlack from "../../assets/image/coming-soon-bg-black.png";
import twitterLogoComingSoon from "../../assets/image/twitter-logo-coming-soon.svg";
import discordLogoComingSoon from "../../assets/image/discord-logo-coming-soon.svg";
import comingSoonPageAnimation1 from "../../assets/image/svgs/coming-soon-animation1.svg";
import comingSoonPageAnimation2 from "../../assets/image/svgs/coming-soon-animation2.svg";
import comingSoonPageAnimation3 from "../../assets/image/svgs/coming-soon-animation3.svg";
import comingSoonPageAnimation4 from "../../assets/image/svgs/coming-soon-animation4.svg";
import "./index.scss";

const SearchResult = () => {
  const [theme, setTheme] = useThemeStore();
  const { address } = useAccount();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const registerWhitelist = async () => {
    try {
      if (!address) {
        toast.error("You should connect wallet at first!");
        return;
      }

      // const isWhitelist = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/whitelists/is-whitelist/${address}`);
      // console.log("is whitelist: ", isWhitelist.data);
      // if (isWhitelist.data) {
      //     toast.warn("You already registered in whitelist!");
      //     return;
      // }

      const country = await getCountry();
      console.log("country: ", country);

      const postObject = {
        wallet: address,
        country: country,
      };
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/whitelists/write-log/`,
        postObject
      );
      toast.success("Wow! You registered successfully in whitelist");
    } catch (e) {
      toast.error("Unfortunately your request was failed");
    }
  };

  const getCountry = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    return res.data.country_name;
  };

  return (
    <Box
      mt={"100px"}
      px={{ xs: "30px", sm: "40px" }}
      sx={{
        backgroundColor: theme == "dark-theme" ? "#2A2A2A" : "white",
      }}
      style={{
        backgroundImage:
          width >= 600
            ? `url(${comingSoonPageBgDesktop}), url(${comingSoonPageBgBlack})`
            : `url(${comingSoonPageBgMobile}), url(${comingSoonPageBgBlack})`,
        backgroundPosition: "left",
        backgroundSize: width >= 600 ? "cover" : "100% 150%",
        backgroundRepeat: "none",
        position: "relative",
        overflow: "hidden",
      }}
      justifyContent={"center"}
      className="coming-soon-component"
    >
      <div className="animation">
        <img
          className="animation1"
          alt="animation"
          src={comingSoonPageAnimation1}
        />
        <img
          className="animation2"
          alt="animation"
          src={comingSoonPageAnimation2}
        />
        <img
          className="animation3"
          alt="animation"
          src={comingSoonPageAnimation3}
        />
        <img
          className="animation4"
          alt="animation"
          src={comingSoonPageAnimation4}
        />
      </div>

      <Box
        display={"flex"}
        justifyContent={"center"}
        zIndex={2}
        position={"relative"}
      >
        <Box marginTop={width >= 600 ? "300px" : "150px"}>
          <Box
            justifyContent={"center"}
            bgcolor={"#39466D"}
            boxShadow={"8px 7px 13px rgba(0, 0, 0, 0.25)"}
            borderRadius={"40px"}
            maxWidth={"990px"}
          >
            <Typography
              fontFamily={"Inter"}
              fontStyle={"normal"}
              fontWeight={"700"}
              fontSize={{ xs: "30px", md: "40px" }}
              lineHeight={"48px"}
              textAlign={"center"}
              color={"white"}
              pt={"55px"}
              px={{ xs: "30px", sm: "75px" }}
              maxW={"800px"}
            >
              Be the first to <span style={{ color: "#4BD8D8" }}>HODL</span> the
              future with Domain Labs Beta
            </Typography>

            <Typography
              fontFamily={"Inter"}
              fontStyle={"normal"}
              fontWeight={"400"}
              fontSize={"18px"}
              lineHeight={"22px"}
              textAlign={"center"}
              color={"white"}
              mt={"18px"}
            >
              Secure your spot: Connect Wallet
            </Typography>

            <Box
              display={"flex"}
              justifyContent={"center"}
              py={"32px"}
              style={{
                cursor: "pointer",
              }}
            >
              <Box
                textAlign={"center"}
                color={"white"}
                borderRadius={"18px"}
                style={{
                  background:
                    "linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)",
                }}
              >
                {!address ? (
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      // Note: If your app doesn't use authentication, you
                      // can remove all 'authenticationStatus' checks
                      const ready =
                        mounted && authenticationStatus !== "loading";
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === "authenticated");

                      return (
                        <div
                          {...(!ready && {
                            "aria-hidden": true,
                            style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                // <Button
                                // >
                                <Typography
                                  fontFamily={"Inter"}
                                  fontStyle={"normal"}
                                  fontWeight={"600"}
                                  fontSize={{ xs: "20px", sm: "27px" }}
                                  lineHeight={"33px"}
                                  textAlign={"center"}
                                  color={"white"}
                                  onClick={openConnectModal}
                                  p={{ xs: "7.5px 30px", sm: "7.5px 80px" }}
                                  width={{ xs: "200px", sm: "250px" }}
                                >
                                  Connect Wallet
                                </Typography>
                                // </Button>
                              );
                            }
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                ) : (
                  <Typography
                    fontFamily={"Inter"}
                    fontStyle={"normal"}
                    fontWeight={"600"}
                    fontSize={{ xs: "20px", sm: "27px" }}
                    lineHeight={"33px"}
                    textAlign={"center"}
                    onClick={() => registerWhitelist()}
                    p={{ xs: "7.5px 30px", sm: "7.5px 80px" }}
                    width={{ xs: "200px", sm: "250px" }}
                  >
                    Request Whitelist
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box my={"32px"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              gap={"75px"}
              className="socials-coming-soon"
            >
              <a href="https://twitter.com/domain_labs/status/1618835949315846144?s=46&t=tMGthxNM6GxdbQbDLLO-Tw">
                <img src={twitterLogoComingSoon} />
              </a>

              <a href="https://discord.gg/rhuUqFHU">
                <img src={discordLogoComingSoon} />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SearchResult;
