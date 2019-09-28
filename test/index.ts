import { equal } from 'assert';
import { URLBlackList } from '../index';

describe('convert', () => {
    it('should convert correctly', () => {
        const blackList = new URLBlackList();
        equal(blackList.convert('HOGE'), 'hoge');
        equal(blackList.convert('HoGe'), 'hoge');
        equal(blackList.convert('Ụ'), 'ụ');
        equal(blackList.convert('‷'), '‵‵‵');
        equal(blackList.convert('ₐ'), 'a');
        equal(blackList.convert('₨'), 'rs');
        equal(blackList.convert('ⅻ'), 'xii');
        equal(blackList.convert('𝓐𝓵𝓸𝓷𝓮𝓜𝓮'), 'aloneme');
        equal(blackList.convert('𝓜𝓮2𝔁'), 'me2x');
        equal(
            blackList.convert('𝓜eet𝓜e-𝓛ove𝓣o𝓝ight.net'),
            'meetme-lovetonight.net'
        );
        equal(blackList.convert('𝓱𝓽𝓽𝓹://🌷💓🌹🌷.cf'), 'http://🌷💓🌹🌷.cf');
        equal(
            blackList.convert('-> http://xn--l8jegik.com'),
            '-> http://あいうえお.com'
        );
        equal(
            blackList.convert('-> 𝓱𝓽𝓽p://xn--𝓛8jegik.com'),
            '-> http://あいうえお.com'
        );
        equal(
            blackList.convert('あああxn--abcdef-k43eqas＜ー'),
            'あああabcあいうdef＜ー'
        );
        equal(blackList.convert(''), '');
    });

    it('should validate text', () => {
        const blackList = new URLBlackList();
        blackList.add('aiueo');
        blackList.add('xn--l8jegik');
        blackList.add('てす.と');
        blackList.add('𝓐𝓵𝓸𝓷𝓮');

        equal(blackList.isValidText('aloneme'), false);
        equal(blackList.isValidText('あいうえお'), false);
        equal(blackList.isValidText('aiueo'), false);
        equal(blackList.isValidText('aiueo kaki'), false);
        equal(blackList.isValidText('aiueokaki'), false);
        equal(blackList.isValidText('あてす.とお'), false);

        equal(blackList.isValidText('kakiku'), true);
        equal(blackList.isValidText(''), true);

        blackList.reset();
        equal(blackList.isValidText('あいうえお'), true);
    });
});
