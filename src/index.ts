import * as fs from 'fs';
import * as path from 'path';
import * as punycode from 'punycode';

export class URLBlackList {
    idnaMap: { [key: number]: number[] };
    blackList: string[];
    constructor() {
        this.idnaMap = JSON.parse(
            fs
                .readFileSync(path.join(__dirname, '../data/idna2008_map.json'))
                .toString()
        );
        this.blackList = [];
    }

    private convertByIDNA(text: string) {
        let ret = '';
        const chars = Array.from(text);
        for (let i = 0; i < chars.length; i++) {
            const from = chars[i].codePointAt(0);
            if (!from) continue;
            const to = this.idnaMap[from]
                ? String.fromCodePoint(...this.idnaMap[from])
                : String.fromCodePoint(from);
            ret += to;
        }
        return ret;
    }

    private convertByPunycode(text: string) {
        return text.replace(/xn--[a-z0-9]+(-[a-z0-9]+)?/g, match =>
            punycode.toUnicode(match)
        );
    }

    convert(text: string) {
        return this.convertByPunycode(this.convertByIDNA(text));
    }

    reset() {
        this.blackList = [];
    }

    add(text: string) {
        this.blackList.push(this.convert(text));
    }

    isValidText(text: string) {
        const convertedText = this.convert(text);
        return !this.blackList.some(blackWord =>
            convertedText.includes(blackWord)
        );
    }
}
