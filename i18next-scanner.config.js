module.exports = {
  input: ['src/**/*.{js,jsx}', '!src/**/*.test.{js,jsx}', '!src/scss/**'],
  options: {
    debug: true,
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      extensions: [], // Parse Trans only in custom transformer
    },
    removeUnusedKeys: true,
    defaultValue: '__STRING_NOT_TRANSLATED__',
    // Add your languages whatever you want
    lngs: ['en', 'vi'],
    resource: {
      loadPath: 'public/assets/i18n/xcbt/{{lng}}/{{ns}}.json',
      savePath: 'public/assets/i18n/xcbt/{{lng}}/{{ns}}.json',
    },
  },
};
