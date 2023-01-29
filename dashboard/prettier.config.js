module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 90,
  importOrder: ['^lib/(.*)$', '^components/(.*)$', '^interfaces/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // eslint-disable-next-line global-require
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
    },
  ],
};
