import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px - 200px)', // viewport height - header - footer
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(10, 4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 6),
  },
}));

export const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

export const AnimatedCard = styled(Box)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 12px 40px rgba(211, 47, 47, 0.3)' 
      : '0 12px 40px rgba(211, 47, 47, 0.2)',
  },
}));