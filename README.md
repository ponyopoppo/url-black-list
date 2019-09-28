# url-black-list

url-black-list is a JavaScript library for blocking specified URLs, which may include unicode, using [IDNA|https://www.unicode.org/Public/idna/latest/IdnaMappingTable.txt] and [punycode|https://github.com/bestiejs/punycode.js].

## Motivation
In my personal app, some evil users posted spam content with URLs. In the begining, I could treat with this kind of spam by implementing filter using black list to block some domains. But afterwards, they started putting URL that can bypass our filter but send victimes to the same location. For example, browsers transform "ℰ𝓍𝒜m𝓅le.𝒞ℴ𝓂" into "example.com" when you put it in address bar. And "℡" can be transformed into "tel", even more amazingly, "㍑" can be "リットル". So the simple text matching based black list is not good solution for this method because they can generate numerous number of equivalent URLs ("ℰ𝓍𝒜m𝓅le.𝒞ℴ𝓂", "E𝓍am𝓅le.𝒞ℴ𝓂", "e𝓍𝒜m𝓅le.co𝓂", "EXAMPLE.COM", "example.com" and so on) easily.

## Installation
```
yarn add url-black-list
# or
npm install --save url-black-list
```

## Examples
```
import { URLBlackList } from 'url-black-list';

const blackList = new URLBlackList();
blackList.add('example.com');
blackList.add('𝒜𝒜𝒜𝒜');

blackList.isValidText('example.com'); // false
blackList.isValidText('ℰ𝓍𝒜m𝓅le.𝒞ℴ𝓂'); // false
blackList.isValidText('aaaa'); // false
blackList.isValidText('AAAA'); // false

blackList.isValidText('valid.domain.com'); // true
```

### License

MIT