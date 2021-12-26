import { parse } from 'node-html-parser';

export function handleHtmlFiles(fileInfo, processIt) {
    if (fileInfo.path.match(/\.htm(l)?$/)) {
        // The file is HTML
        const source = fileInfo.source;
        const dom = parse(source);

        const scriptNodes = Array.from(
            dom.getElementsByTagName('script')
        ).filter(s => !s.getAttribute('src'));

        let prevIndex = source.length;
        const parts = scriptNodes
            .reverse()
            .map(s => {
                const [start, end] = s.range;

                const orig = s.innerHTML;
                const updated = processIt(orig);

                // ignore this block if it was not modified, it will get copied from the input.
                if (orig === updated) {
                    return '';
                }

                s.innerHTML = updated;
                const blocks =
                    s.outerHTML + source.substring(end + 1, prevIndex);
                prevIndex = start;
                return blocks;
            })
            .reverse();

        parts.unshift(source.substring(0, prevIndex));
        return parts.join('');
    } else {
        return processIt(fileInfo.source);
    }
}
