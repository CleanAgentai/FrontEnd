import { lazy } from 'react';

// Utility function to handle lazy imports with proper typing
const lazyImport = (path: string) => lazy(() => import(`/src/pages/${path}`));

// Public Pages
export const LandingPage = lazyImport('LandingPage');
export const AboutPage = lazyImport('AboutPage');
export const FeaturesPage = lazyImport('FeaturesPage');
export const TestimonialsPage = lazyImport('TestimonialsPage');
export const FAQPage = lazyImport('FAQPage');
export const BlogPage = lazyImport('BlogPage');
export const CareersPage = lazyImport('CareersPage');

// Auth Pages
export const LoginPage = lazyImport('auth/LoginPage');
export const SignUpPage = lazyImport('auth/SignUpPage');
export const ForgotPasswordPage = lazyImport('auth/ForgotPasswordPage');
export const ResetPasswordPage = lazyImport('auth/ResetPasswordPage');

// Dashboard Pages
export const DashboardLayout = lazyImport('dashboard/DashboardLayout');
export const OverviewPage = lazyImport('dashboard/OverviewPage');
export const JobsPage = lazyImport('dashboard/JobsPage');
export const CandidatesPage = lazyImport('dashboard/CandidatesPage');
export const AnalyticsPage = lazyImport('dashboard/AnalyticsPage');
export const SettingsPage = lazyImport('dashboard/SettingsPage');
export const BillingPage = lazyImport('dashboard/BillingPage');