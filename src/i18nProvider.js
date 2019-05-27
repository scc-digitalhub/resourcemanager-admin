import englishMessages from 'ra-language-english';

const messages = {
    it: () => import('ra-language-italian').then(messages => messages.default),
};

export default locale => {
    if (locale === 'it') {
        return messages[locale]();
    }

    // Always fallback on english
    return englishMessages;
};