import React, { useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight, PlayArrow } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images, videoUrl }) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Combine images and video
  const media = [...images];
  if (videoUrl) {
    media.push({ type: 'video', url: videoUrl });
  }

  const handlePrevious = () => {
    setShowVideo(false);
    setSelectedIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setShowVideo(false);
    setSelectedIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    if (media[index].type === 'video') {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  };

  const getVideoId = (url) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  };

  return (
    <Box>
      {/* Main Display */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 400,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2
        }}
      >
        <AnimatePresence mode="wait">
          {showVideo && media[selectedIndex]?.type === 'video' ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%' }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getVideoId(media[selectedIndex].url)}?autoplay=1`}
                title="Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ) : (
            <motion.img
              key={selectedIndex}
              src={media[selectedIndex]?.type === 'video' ? images[0] : media[selectedIndex]}
              alt={`Product ${selectedIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '16px'
              }}
            />
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.paper' }
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.paper' }
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnails */}
      {media.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 8
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4
            }
          }}
        >
          {media.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                minWidth: 80,
                height: 80,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedIndex === index ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              {item.type === 'video' ? (
                <>
                  <img
                    src={images[0]}
                    alt="Video thumbnail"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <PlayArrow
                    sx={{
                      position: 'absolute',
                      color: 'white',
                      fontSize: 30,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      borderRadius: '50%',
                      p: 0.5
                    }}
                  />
                </>
              ) : (
                <img
                  src={item}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '4px'
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageGallery;