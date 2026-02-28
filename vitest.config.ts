import { defineConfig } from 'vitest/config';
import { transformSync } from '@babel/core';

export default defineConfig({
  plugins: [
    {
      name: 'babel-flow',
      transform(code, id) {
        if (!id.endsWith('.js')) return null;
        const result = transformSync(code, {
          filename: id,
          plugins: ['@babel/plugin-transform-flow-strip-types'],
          presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: false }]],
        });
        return result?.code ?? null;
      },
    },
  ],
  test: {
    globals: false,
    include: ['test/**/*.test.ts'],
  },
});
