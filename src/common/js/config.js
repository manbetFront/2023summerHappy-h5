export const ERR_OK = 0
export const TIME_OUT = 50000
export const IS_PROD_ENV = process.env.VUE_APP_TITLE === 'PROD' //线上环境
export const IS_TEST_ENV = process.env.VUE_APP_TITLE === 'TEST' //测试环境
export const IS_STATIC_ENV = process.env.VUE_APP_TITLE === 'STATIC'//静态环境
