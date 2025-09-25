// eslint.config.js
import js from '@eslint/js'
import babelParser from '@babel/eslint-parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      prettier,
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': ['error', { allow: ['error'] }],
      'prettier/prettier': 'error',
      'react/prop-types': 'off',

      // 👇 Esto arregla el bug que tienes
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
