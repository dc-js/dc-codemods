import { process } from './process.mjs';
import { setupExtensions } from './utils/setup-extensions.mjs';

import jscodesift from 'jscodeshift';
import { handleHtmlFiles } from './utils/handle-html-files.mjs';

setupExtensions(jscodesift);

export default (fileInfo, api, options) => {
    const { jscodeshift, stats, report } = api;
    const j = jscodeshift;

    return handleHtmlFiles(fileInfo, orig => {
        const root = j(orig);
        return process(root, api, options);
    });
};
