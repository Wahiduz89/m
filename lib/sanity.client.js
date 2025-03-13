// app/lib/sanity.client.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Ensure environment variables are defined
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET || !process.env.NEXT_PUBLIC_SANITY_TOKEN) {
  throw new Error('Missing required environment variables for Sanity client');
}

// Create and export the Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-08-01', // Use current UTC date - see https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === 'production', // Enable CDN in production
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Optional authentication token
  ignoreBrowserTokenWarning: true,
});

// Create and export the image URL builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source);
};

// Helper function for fetching data
export const fetchSanityData = async (query, params = {}) => {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
};

// Get page data by slug
export const getPage = async (slug) => {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    heroImage,
    content,
    "announcements": announcements[]-> {
      _id,
      title,
      excerpt,
      date
    },
    "featuredNews": featuredNews[]-> {
      _id,
      title,
      excerpt,
      publishedAt,
      slug
    },
    mission,
    vision,
    admissionProcess,
    applicationDeadlines,
    fees
  }`;
  
  return fetchSanityData(query, { slug });
};

// Get upcoming events
export const getUpcomingEvents = async (limit = 3) => {
  const today = new Date().toISOString();
  const query = `*[_type == "event" && date >= $today] | order(date asc)[0...$limit]{
    _id,
    title,
    date,
    location,
    description,
    image,
    slug
  }`;
  
  return fetchSanityData(query, { today, limit: limit - 1 });
};

// Get staff members
export const getStaffMembers = async () => {
  const query = `*[_type == "staff"] | order(order asc){
    _id,
    name,
    position,
    bio,
    image,
    email
  }`;
  
  return fetchSanityData(query);
};

// Get news article by slug
export const getNewsBySlug = async (slug) => {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    mainImage,
    content,
    "categories": categories[]-> {
      _id,
      title
    }
  }`;
  
  return fetchSanityData(query, { slug });
};

// Get all news articles
export const getAllNews = async (limit = 10) => {
  const query = `*[_type == "news"] | order(publishedAt desc)[0...$limit]{
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }`;
  
  return fetchSanityData(query, { limit: limit - 1 });
};