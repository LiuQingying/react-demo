/**
 * Created by guoyuexin on 2019-02-20 10:30:48
 * 自定义Error
 */

// todo 添加新的自定义Error时将default删除
export class InvalidTokenError extends Error {
  constructor(error) {
    super(error);
    this.name = 'InvalidTokenError';
  }
}

export class InvalidResponseFormatError extends Error {
  constructor(error) {
    super(error);
    this.name = 'InvalidResponseFormatError';
  }
}
