import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAllGalleryImages } from '../services/galleryService';
import { fadeInUp } from '../styles/animations';
import GalleryBackground from '../components/common/GalleryBackground';

const Gallery = () => {
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const data = await getAllGalleryImages();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedImage(null), 200);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Layer - stays behind everything */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 0 
      }}>
        <GalleryBackground />
      </Box>

      {/* Content Layer - appears on top */}
      <Box sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              fontWeight={900}
              textAlign="center"
              fontFamily={'Montserrat'}
              fontSize={50}
            >
              Celebrations & Events
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              textAlign="center"
              sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              Memorable moments from our store visits, celebrity appearances, and special events
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {images.map((image, index) => (
              <Grid item xs={12} md={6} key={image._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: 400,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[16],
                        '& .image': {
                          transform: 'scale(1.08)',
                        },
                        '& .overlay': {
                          opacity: 1
                        }
                      }
                    }}
                    onClick={() => handleImageClick(image)}
                  >
                    <CardMedia
                      component="img"
                      className="image"
                      image={image.imageUrl || image.url}
                      alt={image.title || image.description}
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(40, 40, 40, 0.95)' 
                          : 'rgba(255, 255, 255, 0.92)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                        textAlign: 'center'
                      }}
                    >
                      {image.title && (
                        <Typography 
                          variant="h5" 
                          fontWeight={600}
                          color="text.primary"
                          gutterBottom
                          sx={{ mb: 2 }}
                        >
                          {image.title}
                        </Typography>
                      )}
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.6
                        }}
                      >
                        {image.description}
                      </Typography>
                      {image.date && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ mt: 2, fontStyle: 'italic' }}
                        >
                          {new Date(image.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      )}
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {images.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No celebration images available yet
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Image Preview Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden'
          }
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)'
            }
          }}
        >
          <Close />
        </IconButton>
        
        <DialogContent sx={{ p: 0, bgcolor: 'transparent' }}>
          {selectedImage && (
            <Box>
              <img
                src={selectedImage.imageUrl || selectedImage.url}
                alt={selectedImage.title || selectedImage.description}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: 8
                }}
              />
              <Box 
                sx={{ 
                  bgcolor: 'background.paper', 
                  p: 3, 
                  mt: 2,
                  borderRadius: 2
                }}
              >
                {selectedImage.title && (
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {selectedImage.title}
                  </Typography>
                )}
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedImage.description}
                </Typography>
                {selectedImage.date && (
                  <Typography variant="caption" color="text.secondary">
                    {new Date(selectedImage.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;