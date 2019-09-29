const { URLBlackList } = require('url-black-list');

const blackList = new URLBlackList();
blackList.add('example.com');
blackList.add('𝒜𝒜𝒜𝒜');

function logIsValidText(text) {
    console.log(text, blackList.isValidText(text));
}

logIsValidText('example.com'); // false
logIsValidText('ℰ𝓍𝒜m𝓅le.𝒞ℴ𝓂'); // false
logIsValidText('aaaa'); // false
logIsValidText('AAAA'); // false

logIsValidText('valid.domain.com'); // true
