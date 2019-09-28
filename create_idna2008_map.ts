import fetch from 'node-fetch';
import * as fs from 'fs';

function parseCodePoints(str: string) {
    return str.split('..').map(codePointStr => parseInt(codePointStr, 16));
}

function parseMapping(str: string) {
    return str.split(' ').map(codePointStr => parseInt(codePointStr, 16));
}

function parseLine(line: string, mappings: { [key: number]: number[] }) {
    const elems: string[] = line
        .replace(/#.*$/, '')
        .split(';')
        .map(elem => elem.trim());
    if (elems[1] !== 'mapped') return null;

    const codePoints = parseCodePoints(elems[0]);
    const mapping = parseMapping(elems[2]);
    for (let codePoint of codePoints) {
        mappings[codePoint] = mapping;
    }
    return mapping;
}

(async function() {
    const text = await fetch(
        'https://www.unicode.org/Public/idna/latest/IdnaMappingTable.txt'
    ).then(res => res.text());
    const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    const mappings = {};
    for (let line of lines) {
        parseLine(line, mappings);
    }
    fs.writeFileSync('./data/idna2008_map.json', JSON.stringify(mappings));
})();
