export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // 750px 设计稿，1rem = 75px
      propList: ['*'],
      selectorBlackList: [], // 黑名单，不需要转换的选择器
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};
