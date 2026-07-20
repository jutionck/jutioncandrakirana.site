import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['backend/**', '.next/**', 'node_modules/**'],
  },
];

export default eslintConfig;
