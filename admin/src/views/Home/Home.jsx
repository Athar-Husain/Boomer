import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Box,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import PagesIcon from "@mui/icons-material/Pages";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArticleIcon from "@mui/icons-material/Article";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link as RouterLink } from "react-router-dom"; // If using React Router

const pages = [
  { label: "Home", icon: <HomeIcon />, href: "/"},
  { label: "About", icon: <InfoIcon />, href: "/about"},
  { label: "Services", icon: <BuildIcon />, href: "/services"},
  { label: "Pages", icon: <PagesIcon />, dropdown: [
      { label: "Features", icon: <StarIcon />, href: "/feature" },
      { label: "Pricing", icon: <MonetizationOnIcon />, href: "/pricing" },
      { label: "Blog", icon: <ArticleIcon />, href: "/blog" },
      { label: "Testimonial", icon: <ThumbUpIcon />, href: "/testimonial" },
      { label: "404 Page", icon: <ErrorOutlineIcon />, href: "/404" },
    ]},
  { label: "Contact Us", icon: <ContactMailIcon />, href: "/contact"},
];

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pagesMenuAnchor, setPagesMenuAnchor] = useState(null);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handlePagesMenuOpen = (event) => setPagesMenuAnchor(event.currentTarget);
  const handlePagesMenuClose = () => setPagesMenuAnchor(null);

  const renderMenuItems = () =>
    pages.map((page) =>
      page.dropdown ? (
        <Box key={page.label} sx={{ display: "inline" }}>
          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={handlePagesMenuOpen}
            sx={{ mx: 1 }}
          >
            {page.label}
          </Button>
          <Menu
            anchorEl={pagesMenuAnchor}
            open={Boolean(pagesMenuAnchor)}
            onClose={handlePagesMenuClose}
          >
            {page.dropdown.map((item) => (
              <MenuItem
                key={item.label}
                component={RouterLink}
                to={item.href}
                onClick={handlePagesMenuClose}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <Button
          key={page.label}
          color="inherit"
          component={RouterLink}
          to={page.href}
          sx={{ mx: 1 }}
        >
          {page.label}
        </Button>
      )
    );

  // Drawer for mobile
  const renderDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
        <List>
          {pages.map((page) =>
            page.dropdown ? (
              <React.Fragment key={page.label}>
                <ListItem button onClick={handlePagesMenuOpen}>
                  <ListItemIcon><PagesIcon /></ListItemIcon>
                  <ListItemText primary={page.label} />
                  <ArrowDropDownIcon />
                </ListItem>
                <Menu
                  anchorEl={pagesMenuAnchor}
                  open={Boolean(pagesMenuAnchor)}
                  onClose={handlePagesMenuClose}
                >
                  {page.dropdown.map((item) => (
                    <MenuItem
                      key={item.label}
                      component={RouterLink}
                      to={item.href}
                      onClick={handlePagesMenuClose}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ) : (
              <ListItem
                button
                key={page.label}
                component={RouterLink}
                to={page.href}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mb: 1 }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Box className="header" sx={{ position: "relative", overflow: "hidden", p: 0 }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 0 } }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="logo"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/"
          >
            <MailOutlineIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            color="primary"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}
            component={RouterLink}
            to="/"
            style={{ textDecoration: "none" }}
          >
            Mailler
          </Typography>
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {renderMenuItems()}
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: "50px", ml: 3, mr: 2 }}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "50px" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderDrawer()}

      {/* Hero Header */}
      <Box
        className="hero-header"
        sx={{
          mt: { xs: 8, md: 10 },
          px: 5,
          py: 8,
          overflow: "hidden",
          background: "#f7f9fc",
        }}
      >
        <Box
          className="rotate-img"
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            zIndex: 0,
            opacity: 0.15,
          }}
        >
          <img
            src="/img/sty-1.png"
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
          <Box
            className="rotate-sty-2"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #1976d2 0%, #90caf9 100%)",
              opacity: 0.1,
              borderRadius: "50%",
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            position: "relative",
            zIndex: 2,
            gap: 5,
          }}
        >
          <Box sx={{ flex: 1, py: 4 }}>
            <Typography variant="h3" color="text.primary" gutterBottom>
              Turn Emails into Revenue
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Win new customers with the #1 email marketing and automations brand* that recommends ways to get more opens, clicks, and sales.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: "50px", py: 2, px: 5, mt: 2 }}
            >
              Get Started
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img
              src="/img/hero-img-1.png"
              alt=""
              style={{ width: "100%", height: "auto", borderRadius: 16 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
