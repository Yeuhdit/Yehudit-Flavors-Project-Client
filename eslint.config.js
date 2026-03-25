// //react-client/src/eslint.config.js
// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//     },
//   },
// ])
// react-client/eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist/**'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: '18.3' }, // או 'detect' אם את רוצה אוטומטי
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules, // חשוב ל-JSX modern
      ...reactHooks.configs.recommended.rules,

      // כיבוי/הקלה על השגיאות המעצבנות ביותר אצלך
      'react/prop-types': 'off',                    // ← מוריד ~40 שגיאות prop-types
      'react/no-unescaped-entities': 'off',         // ← מוריד את כל ה-' ו-" ב-JSX
      'react/react-in-jsx-scope': 'off',            // מיותר ב-React 17+
      'no-unused-vars': ['warn', {                  // שנה error → warn + ignore patterns
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',                    // מאפשר _var בלי תלונה
        argsIgnorePattern: '^_',
      }],
      'no-useless-catch': 'warn',                   // ← מ- error ל-warn
      'no-empty': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-no-target-blank': 'off',           // אם לא רוצה אזהרה על target="_blank"
    },
  },
];