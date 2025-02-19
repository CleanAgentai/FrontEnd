import { useEffect } from 'react';

export interface DocumentMetaProps {
  title: string;
  description: string;
  noindex?: boolean;
  robots?: string;
  canonical?: string;
}

export function useDocumentMeta({ title, description, noindex = false }: DocumentMetaProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');

    // Cleanup function
    return () => {
      document.title = 'CleanAgent.AI - AI Agents for the Cleaning Industry';
      if (metaDescription) {
        metaDescription.setAttribute('content', '');
      }
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, [title, description, noindex]);
} 