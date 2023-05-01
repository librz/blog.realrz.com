
/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
module.exports = withContentlayer({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});
