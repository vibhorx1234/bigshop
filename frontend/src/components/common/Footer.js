// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Link,
//   IconButton,
//   Divider,
//   useTheme
// } from '@mui/material';
// import {
//   LocationOn,
//   Phone,
//   Email,
//   Facebook,
//   Twitter,
//   Instagram,
//   YouTube,
//   AccessTime
// } from '@mui/icons-material';
// import { Link as RouterLink } from 'react-router-dom';
// import { SHOP_INFO, CATEGORIES } from '../../utils/constants';
// import { motion } from 'framer-motion';

// const Footer = () => {
//   const theme = useTheme();
//   const currentYear = new Date().getFullYear();

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
//         pt: 6,
//         pb: 3,
//         mt: 'auto'
//       }}
//     >
//       <Container maxWidth="xl">
//         <Grid container spacing={4}>
//           {/* Company Info */}
//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 sx={{
//                   fontWeight: 700,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent'
//                 }}
//               >
//                 {SHOP_INFO.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" paragraph>
//                 Your trusted destination for premium LG & Voltas electronics. Quality products, excellent service.
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
//                 <IconButton size="small" color="primary">
//                   <Facebook />
//                 </IconButton>
//                 <IconButton size="small" color="primary">
//                   <Twitter />
//                 </IconButton>
//                 <IconButton size="small" color="primary">
//                   <Instagram />
//                 </IconButton>
//                 <IconButton size="small" color="primary">
//                   <YouTube />
//                 </IconButton>
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Quick Links */}
//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <Typography variant="h6" gutterBottom fontWeight={600}>
//                 Quick Links
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <Link component={RouterLink} to="/" color="text.secondary" underline="hover">
//                   Home
//                 </Link>
//                 <Link component={RouterLink} to="/about" color="text.secondary" underline="hover">
//                   About Us
//                 </Link>
//                 <Link component={RouterLink} to="/products" color="text.secondary" underline="hover">
//                   Products
//                 </Link>
//                 <Link component={RouterLink} to="/bulk-enquiry" color="text.secondary" underline="hover">
//                   Bulk Enquiry
//                 </Link>
//                 <Link component={RouterLink} to="/contact" color="text.secondary" underline="hover">
//                   Contact
//                 </Link>
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Product Categories */}
//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Typography variant="h6" gutterBottom fontWeight={600}>
//                 Products
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 {CATEGORIES.slice(1).map((category) => (
//                   <Link
//                     key={category.value}
//                     component={RouterLink}
//                     to={category.path}
//                     color="text.secondary"
//                     underline="hover"
//                   >
//                     {category.name}
//                   </Link>
//                 ))}
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Contact Info */}
//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Typography variant="h6" gutterBottom fontWeight={600}>
//                 Contact Us
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
//                   <LocationOn fontSize="small" color="primary" />
//                   <Typography variant="body2" color="text.secondary">
//                     {SHOP_INFO.address}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Phone fontSize="small" color="primary" />
//                   <Typography variant="body2" color="text.secondary">
//                     {SHOP_INFO.phone}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Email fontSize="small" color="primary" />
//                   <Typography variant="body2" color="text.secondary">
//                     {SHOP_INFO.email}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
//                   <AccessTime fontSize="small" color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">
//                       Mon-Fri: {SHOP_INFO.workingHours.weekdays}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Sat-Sun: {SHOP_INFO.workingHours.weekends}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </motion.div>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         <Box sx={{ textAlign: 'center' }}>
//           <Typography variant="body2" color="text.secondary">
//             © {currentYear} {SHOP_INFO.name}. All rights reserved.
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             Designed & Developed with ❤️ for BigShop
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;





import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  AccessTime
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { SHOP_INFO } from '../../utils/constants';
import { motion } from 'framer-motion';

// ✅ Product list directly defined here (you can import if preferred)
const PRODUCTS = [
  { name: 'TV', path: '/products/tv' },
  { name: 'AC', path: '/products/ac' },
  { name: 'Washing Machine', path: '/products/washing-machine' },
  { name: 'Refrigerator', path: '/products/refrigerator' },
  { name: 'Dishwashers', path: '/products/dishwashers' },
  { name: 'Microwave Ovens', path: '/products/microwave-ovens' },
  { name: 'LG Audio', path: '/products/audio' },
  { name: 'Water Purifier', path: '/products/water-purifier' }
  // { name: 'Deep Freezer', path: '/products/freezer' },
  // { name: 'Visi Cooler', path: '/products/visi' },
  // { name: 'Homeware', path: '/products/homeware' }
];

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
        pt: 6,
        pb: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {SHOP_INFO.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Your trusted destination for premium electronics. Quality products, excellent service.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <IconButton size="small" color="primary"><Facebook /></IconButton>
                <IconButton size="small" color="primary"><Twitter /></IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  component="a"
                  href="https://www.instagram.com/bigshop_2008?igsh=bXo2NWg0eDZub2p4&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </IconButton>
                <IconButton size="small" color="primary"><YouTube /></IconButton>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link component={RouterLink} to="/" color="text.secondary" underline="hover">Home</Link>
                <Link component={RouterLink} to="/about" color="text.secondary" underline="hover">About Us</Link>
                {/* <Link component={RouterLink} to="/products" color="text.secondary" underline="hover">Products</Link> */}
                <Link component={RouterLink} to="/bulk-enquiry" color="text.secondary" underline="hover">Bulk Enquiry</Link>
                <Link component={RouterLink} to="/contact" color="text.secondary" underline="hover">Contact</Link>
              </Box>
            </motion.div>
          </Grid>

          {/* ✅ Product Categories (Updated Section) */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Products
              </Typography>
              <Grid container spacing={0.5}>
                {PRODUCTS.map((product) => (
                  <Grid item xs={6} key={product.name}>
                    <Link
                      component={RouterLink}
                      to={product.path}
                      color="text.secondary"
                      underline="hover"
                      sx={{ display: 'block', fontSize: '0.9rem' }}
                    >
                      {product.name}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOn fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {SHOP_INFO.address}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {SHOP_INFO.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {SHOP_INFO.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <AccessTime fontSize="small" color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Mon-Fri: {SHOP_INFO.workingHours.weekdays}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sat-Sun: {SHOP_INFO.workingHours.weekends}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {SHOP_INFO.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Designed & Developed with ❤️ for BigShop
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;