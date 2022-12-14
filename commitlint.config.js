module.exports = { 
    extends: ['@commitlint/config-conventional'],

    rules: {
        'body-max-line-length': [1, 'always', 72],
        'header-max-length': [1, 'always', 52],
        'type-enum': [2, 'always', [
            'build',
            'chore',
            'ci',
            'docs',
            'feat',
            'fix',
            'perf',
            'refactor',
            'security',
            'style',
            'test'
        ]]
    }
};