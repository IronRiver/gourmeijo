/**
 * @param {import("webpack").Configuration} config
 * @param {Parameters<import("next").NextConfig["webpack"]>[1]} context
 */
const webpackConfig = (config) => {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test?.test?.(".svg")
  );

  config.module.rules.push(
    // Reapply the existing rule, but only for svg imports ending in ?url
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      // resourceQuery: /url/, // *.svg?url
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /react/] }, // exclude if *.svg?url
    },
    // Convert all other *.svg imports to React components
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      // resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      resourceQuery: /react/, // *.svg?url
      use: ["@svgr/webpack"],
    }
  );

  // // Modify the file loader rule to ignore *.svg, since we have it handled now.
  // fileLoaderRule.exclude = /\.svg$/i;

  return config;
};

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: webpackConfig,
};

module.exports = nextConfig;
