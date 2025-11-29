// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Shahmir Ahmed | Software Developer & Programmer",
  description = "Shahmir Ahmed - Creative Software Developer and Programmer specializing in AI/ML, Full-Stack Development, and Cybersecurity. Explore innovative projects in React, Python, Node.js, and more.",
  keywords = "Shahmir Ahmed, Programmer, Software Developer, Full-Stack Developer, Web Developer, AI Engineer, Machine Learning, React Developer, Python Developer",
  url = "https://shahmirahmad.vercel.app/",
  image = "https://shahmirahmad.vercel.app/og-image.jpg",
  type = "website",
  canonical,
  schemaMarkup
}) => {
  const siteUrl = "https://shahmirahmad.vercel.app";
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Shahmir Ahmed Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
