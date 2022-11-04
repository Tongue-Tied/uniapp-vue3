module.exports = {
    "root": true,
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "commonjs": true,
        "amd": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'vue/multi-word-component-names': 'off',
        'no-useless-escape': 'off',
        'comma-dangle': 2,
        'space-before-function-paren': 2,
        eqeqeq: 'off',
        'no-var': 2,
        'no-mixed-operators': 'off',
        'vue/no-v-model-argument': 'off',
        'no-unused-vars': 2,
        'no-unused-expressions': 2,
        'no-empty-function': 2,
        'no-void': 2,
        'no-redeclare': 2
    }
};
