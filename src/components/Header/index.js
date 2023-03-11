import Box from '@mui/material/Box';
import homeIcon from '../../images/home-icon.svg';
import instagramIcon from '../../images/instagram-icon.svg';
import facebookIcon from '../../images/facebook-icon.svg';
import tikTokIcon from '../../images/tiktok-icon.svg';
import logo from '../../images/logo.svg';
import mainImg from '../../images/main.png';
import IconLink from '../IconLink';
import './header.scss';

const Header = () => {
  return (
    <header>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ maxWidth: '1200px' }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          sx={{ padding: '0 10% 0 10% ' }}
          className="header"
        >
          <IconLink href="https://goodsushi.if.ua/" src={logo} alt="logo " />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ gap: '8px' }}
          >
            <IconLink
              href="https://goodsushi.if.ua/"
              src={homeIcon}
              alt="home icon"
            />

            <IconLink
              href="https://www.instagram.com/goodsushipizza/"
              src={instagramIcon}
              alt="instagram icon"
            />

            <IconLink
              href="https://www.facebook.com/goodsushipizza"
              src={facebookIcon}
              alt="facebook icon"
            />

            <IconLink
              href="https://www.tiktok.com/@goodsushipizza"
              src={tikTokIcon}
              alt="tik tok icon"
            />
          </Box>
        </Box>

        <img className="main-image" src={mainImg} alt="main" />
      </Box>
    </header>
  );
};

export default Header;
