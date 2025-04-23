const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

async function createUrlsFile() {
    try {
        const urls = await getUrls();
        fs.writeFileSync('./lighthouse/urls.json', urls);
    } catch (e) {
        console.error(e);
        return;
    }
}

async function getUrls() {
    let data = {};
    data.urls = [];
    const directories = [
        {
            path: './build/components',
        },
        {
            path: './build/patterns',
        },
        {
            path: './build/foundations',
        },
    ];
    const skipURLs = [
        'example-errors-proto.html',
        'example-errors-proto-errors.html',
        'example-feedback-form.html',
        'example-feedback-form-errors.html',
        'example-radios-with-revealed-text-input.html',
        'example-radios-with-revealed-text-input-expanded.html',
        'example-radios-with-revealed-text-area.html',
        'example-radios-with-revealed-text-area-expanded.html',
        'example-radios-with-revealed-select.html',
        'example-radios-with-revealed-select-expanded.html',
        'example-radios-with-revealed-radios.html',
        'example-radios-with-revealed-radios-expanded.html',
        'example-radios-with-revealed-checkboxes.html',
        'example-radios-with-revealed-checkboxes-expanded.html',
        'example-radios-with-clear-button.html',
        'example-radios-with-clear-button-expanded.html',
        'example-accordion.html',
        'example-button-custom.html',
        'example-button-download.html',
        'index.html',
        'example-button.html',
        'example-skip-to-content.html',
    ];
    for (const directory of directories) {
        const folders = await readdir(directory.path);
        for (const folder of folders) {
            const files = await glob(`${directory.path}/${folder}/**/*.html`);
            const filteredFiles = files.filter((path) => {
                return !skipURLs.some((skip) => path.includes(skip));
            });
            for (const file of filteredFiles) {
                data.urls.push(file.replace('build/', 'http://localhost/'));
            }
        }
    }
    return JSON.stringify(data);
}

createUrlsFile();
