// 通用函数API
import { size } from "lodash-es";
import { encrypt, decrypt } from "@/utils/crypto";

// 报表默认数据格式化
const formatter = (row: any, column: any, cellValue: any, index: any) => {
  return cellValue || "--";
};

// 手机号格式化
const formatterPhone = (row: any, column: any, cellValue: any, index: any) => {
  return starEncrypt(decrypt(cellValue), 3, 3, 3) || "--";
};

/** *号加密
 * @param value 数据
 * @param start 开头保留位数
 * @param num *的个数
 * @param end 结尾保留位数
 * @returns start+num+end
 */
const starEncrypt = (value: any, start: number, num: number, end: number) => {
  value = value.toString();
  const valStart = value.substr(0, start);
  let valNum = "";
  for (let i = 0; i < num; i++) {
    valNum += "*";
  }
  const valEnd = value.substr(size(value) - end, end);

  return valStart + valNum + valEnd;
};

export { formatter, formatterPhone, starEncrypt };
