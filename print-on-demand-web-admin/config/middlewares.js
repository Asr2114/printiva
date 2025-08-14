module.exports = [
  'strapi::logger',
  'strapi::errors',
  // config/middlewares.js

  {
    "name": "strapi::security",
    "config": {
      "contentSecurityPolicy": {
        "useDefaults": true,
        "directives": {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "ik.imagekit.io", // ImageKit domain for images, add your custom domain if you use one
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "ik.imagekit.io", // ImageKit domain for videos/audio, add your custom domain if you use one
          ],
          "frame-src": [
            "'self'",
            "data:",
            "blob:",
            "eml.imagekit.io", // For ImageKit UI components
          ],
          "upgradeInsecureRequests": null,
        },
      },
    },
  },
  // Keep your other middleware entries as it is

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
