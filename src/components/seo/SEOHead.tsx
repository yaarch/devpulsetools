import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  SITE_URL,
  SITE_NAME,
  HOMEPAGE_SEO,
  ALL_TOOLS_SEO,
  STATIC_PAGES_SEO,
  getToolSeo
} from '../../config/seoConfig';
import { TOOLS_MAP } from '../../data/toolsData';

export const SEOHead: React.FC = () => {
  const { activePage } = useApp();

  useEffect(() => {
    let title = HOMEPAGE_SEO.title;
    let description = HOMEPAGE_SEO.metaDescription;
    let canonical = HOMEPAGE_SEO.canonical;
    let ogType = 'website';
    let schemaJson: any = null;

    if (activePage.type === 'home') {
      title = HOMEPAGE_SEO.title;
      description = HOMEPAGE_SEO.metaDescription;
      canonical = HOMEPAGE_SEO.canonical;
      ogType = 'website';

      schemaJson = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            description: HOMEPAGE_SEO.metaDescription,
            publisher: {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/favicon.ico`
              }
            }
          },
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            sameAs: []
          }
        ]
      };
    } else if (activePage.type === 'tools') {
      title = ALL_TOOLS_SEO.title;
      description = ALL_TOOLS_SEO.metaDescription;
      canonical = ALL_TOOLS_SEO.canonical;
      ogType = 'website';

      schemaJson = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: ALL_TOOLS_SEO.h1,
            url: ALL_TOOLS_SEO.canonical,
            description: ALL_TOOLS_SEO.metaDescription,
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: `${SITE_URL}/tools/`
              }
            ]
          }
        ]
      };
    } else if (activePage.type === 'real-estate') {
      title = 'Real Estate & Mortgage Calculator – Free Property Investment Hub | DevPulse';
      description = 'Calculate mortgage amortization schedules, rental property ROI & Cap Rate, cash-on-cash return, and rent vs. buy financial feasibility with 100% private client-side processing.';
      canonical = `${SITE_URL}/tools/real-estate-calculator/`;
      ogType = 'website';

      schemaJson = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: 'Real Estate & Mortgage Calculator Hub',
            url: canonical,
            description: 'Calculate mortgage amortization schedules, rental property ROI & Cap Rate, and rent vs. buy comparison.',
            applicationCategory: 'FinancialApplication',
            operatingSystem: 'All modern browsers',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Real Estate Hub',
                item: canonical
              }
            ]
          }
        ]
      };
    } else if (activePage.type === 'tool') {
      const toolSeo = getToolSeo(activePage.toolId);
      if (toolSeo) {
        title = toolSeo.title;
        description = toolSeo.metaDescription;
        canonical = `${SITE_URL}/tools/${toolSeo.slug}/`;
        ogType = 'article';

        schemaJson = {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebApplication',
              name: toolSeo.h1,
              url: canonical,
              description: toolSeo.metaDescription,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'All modern browsers',
              browserRequirements: 'Requires JavaScript. Runs client-side in Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              isPartOf: {
                '@type': 'WebSite',
                name: SITE_NAME,
                url: SITE_URL
              }
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${SITE_URL}/`
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Tools',
                  item: `${SITE_URL}/tools/`
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: toolSeo.h1,
                  item: canonical
                }
              ]
            }
          ]
        };
      } else {
        const toolData = TOOLS_MAP[activePage.toolId];
        if (toolData) {
          title = `${toolData.name} – Free Online Tool | ${SITE_NAME}`;
          description = toolData.shortDesc;
          canonical = `${SITE_URL}/tools/${toolData.slug || toolData.id}/`;
          ogType = 'article';

          schemaJson = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: toolData.name,
                url: canonical,
                description: toolData.shortDesc,
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All modern browsers',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD'
                },
                isPartOf: {
                  '@type': 'WebSite',
                  name: SITE_NAME,
                  url: SITE_URL
                }
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: `${SITE_URL}/`
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Tools',
                    item: `${SITE_URL}/tools/`
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: toolData.name,
                    item: canonical
                  }
                ]
              }
            ]
          };
        }
      }
    } else if (STATIC_PAGES_SEO[activePage.type]) {
      const pageSeo = STATIC_PAGES_SEO[activePage.type];
      title = pageSeo.title;
      description = pageSeo.metaDescription;
      canonical = pageSeo.canonical;
      ogType = 'website';

      schemaJson = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: pageSeo.h1,
            url: pageSeo.canonical,
            description: pageSeo.metaDescription,
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: pageSeo.h1,
                item: pageSeo.canonical
              }
            ]
          }
        ]
      };
    }

    // 1. Update document title
    document.title = title;

    // 2. Update or create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update or create Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 4. Update Open Graph tags
    const updateMeta = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', canonical);
    updateMeta('og:type', ogType);
    updateMeta('og:site_name', SITE_NAME);

    // 5. Update Twitter tags
    const updateTwitterMeta = (name: string, val: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    updateTwitterMeta('twitter:card', 'summary_large_image');
    updateTwitterMeta('twitter:title', title);
    updateTwitterMeta('twitter:description', description);

    // 6. Update JSON-LD Script
    let jsonLdScript = document.getElementById('seo-structured-data');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-structured-data';
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    if (schemaJson) {
      jsonLdScript.textContent = JSON.stringify(schemaJson, null, 2);
    }
  }, [activePage]);

  return null;
};
