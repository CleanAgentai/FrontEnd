import { lazy } from 'react';

// Public Pages
export const LandingPage = lazy(() => import('../pages/LandingPage/index.tsx'));
export const AboutPage = lazy(() => import('../pages/AboutPage.tsx'));
export const FeaturesPage = lazy(() => import('../pages/FeaturesPage.tsx'));
export const TestimonialsPage = lazy(() => import('../pages/TestimonialsPage.tsx'));
export const FAQPage = lazy(() => import('../pages/FAQPage.tsx'));
export const BlogPage = lazy(() => import('../pages/BlogPage.tsx'));
export const CareersPage = lazy(() => import('../pages/CareersPage.tsx'));