/**
 * Create by liukaiming on 2019/4/14
 * */
const getKey = id => `${id || ''}_${new Date().getTime()}`;
export default getKey;
