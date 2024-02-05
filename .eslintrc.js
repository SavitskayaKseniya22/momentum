module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ['airbnb-base', 'airbnb-typescript/base', "plugin:prettier/recommended", "prettier"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
                
            }
        }
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.eslint.json'
    },
    "plugins": ["@typescript-eslint","prettier"],
    "rules": {
        "prettier/prettier": "error",
        '@typescript-eslint/no-explicit-any': 'error',
    }
}
