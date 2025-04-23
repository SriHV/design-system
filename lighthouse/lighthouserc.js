const mode = process.env.LHCI_MODE;
console.log(mode);
const urls =
    mode === 'full'
        ? require('./urls.json').urls
        : [
              'patterns/correct-errors/example-errors-proto.html',
              'patterns/correct-errors/example-errors-proto-errors.html',
              'patterns/feedback/example-feedback-form.html',
              'patterns/feedback/example-feedback-form-errors.html',
              'components/radios/example-radios-with-revealed-text-input.html',
              'components/radios/example-radios-with-revealed-text-input-expanded.html',
              'components/radios/example-radios-with-revealed-text-area.html',
              'components/radios/example-radios-with-revealed-text-area-expanded.html',
              'components/radios/example-radios-with-revealed-select.html',
              'components/radios/example-radios-with-revealed-select-expanded.html',
              'components/radios/example-radios-with-revealed-radios.html',
              'components/radios/example-radios-with-revealed-radios-expanded.html',
              'components/radios/example-radios-with-revealed-checkboxes.html',
              'components/radios/example-radios-with-revealed-checkboxes-expanded.html',
              'components/radios/example-radios-with-clear-button.html',
              'components/radios/example-radios-with-clear-button-expanded.html',
              'components/accordion/example-accordion.html',
              'components/button/example-button-custom.html',
              'components/button/example-button-download.html',
          ];
module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: urls,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
                ...(mode === 'skip' ? { skipAudits: ['aria-allowed-attr'] } : {}),
            },
        },
        assert: {
            assertions: {
                'categories:accessibility': ['error', { minScore: 1 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
