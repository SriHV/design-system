const mode = process.env.LHCI_MODE;
const urls = mode === 'all' ? require('./urls.json').urls : require('./urls.json').skipurls; // if env var is 'all' it retrieves urls from url array, else it retrieves urls from skipurls array.
module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: urls,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
                ...(mode === 'skipAudits' ? { skipAudits: ['aria-allowed-attr'] } : {}), // skips aria-allowed-attr audit for the urls in skipurls array
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
