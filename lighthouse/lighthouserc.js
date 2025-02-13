module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: require('./urls.json').urls,
            // url: [
            //     'patterns/correct-errors/example-errors-proto.html',
            //     'patterns/correct-errors/example-errors-proto-errors.html',
            //     'patterns/feedback/example-feedback-form.html',
            //     'patterns/feedback/example-feedback-form-errors.html',
            //     'components/radios/example-radios-with-revealed-text-input.html',
            //     'components/radios/example-radios-with-revealed-text-input-expanded.html',
            //     'components/radios/example-radios-with-revealed-text-area.html',
            //     'components/radios/example-radios-with-revealed-text-area-expanded.html',
            //     'components/radios/example-radios-with-revealed-select.html',
            //     'components/radios/example-radios-with-revealed-select-expanded.html',
            //     'components/radios/example-radios-with-revealed-radios.html',
            //     'components/radios/example-radios-with-revealed-radios-expanded.html',
            //     'components/radios/example-radios-with-revealed-checkboxes.html',
            //     'components/radios/example-radios-with-revealed-checkboxes-expanded.html',
            //     'components/radios/example-radios-with-clear-button.html',
            //     'components/radios/example-radios-with-clear-button-expanded.html',
            //     'components/accordion/example-accordion.html',
            //     'components/button/example-button-custom.html',
            //     'components/button/example-button-download.html',
            // ],
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
            },
        },
        // prettier-ignore
        assert: {
            assertMatrix: [
                {
                    matchingUrlPattern: 'components/radios/example-radios-with-revealed.*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 0.91 }],
                    },
                },
                {
                    matchingUrlPattern: 'components/radios/example-radios-with-clear-button.*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 0.93 }],
                    },
                },
                {
                    matchingUrlPattern: 'patterns/feedback/example-feedback-form.*|patterns/correct-errors/example-errors-proto.*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 0.94 }],
                    },
                },
                {
                    matchingUrlPattern:'^(?!.*components/radios/example-radios-with-revealed.*|.*components/radios/example-radios-with-clear-button.*|.*patterns/correct-errors/example-errors-proto.*|.*patterns/feedback/example-feedback-form.*).*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 1 }],
                    },
                },
            ],
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
