import { supabase } from '@/lib/supabase';

interface NewsletterSignup {
  email: string;
  timestamp: string;
  source: string;
}

interface ContactFormSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  timestamp: string;
}

class EmailService {
  async subscribeToNewsletter(email: string): Promise<void> {
    const data: NewsletterSignup = {
      email,
      timestamp: new Date().toISOString(),
      source: window.location.pathname
    };

    // For development/testing, log the data
    if (import.meta.env.DEV) {
      console.log('Newsletter signup:', data);
    }

    // Store in Supabase
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([data]);

    if (error) {
      console.error('Error storing newsletter subscription:', error);
      throw error;
    }
  }

  async submitContactForm(formData: Omit<ContactFormSubmission, 'timestamp'>): Promise<void> {
    const data: ContactFormSubmission = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    // For development/testing, log the data
    if (import.meta.env.DEV) {
      console.log('Contact form submission:', data);
    }

    // Store in Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert([data]);

    if (error) {
      console.error('Error storing contact submission:', error);
      throw error;
    }

    // Send notification email using Supabase Edge Function
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: 'support@cleanagent.ai',
        subject: `New Contact Form Submission: ${formData.subject}`,
        template: 'contact-form-notification',
        data: formData
      })
    });
  }
}

export const emailService = new EmailService(); 