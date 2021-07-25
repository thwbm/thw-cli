// 用户中心-用户管理-配置

import { h } from "vue";
import { ElButton } from "element-plus";
import { formatterPhone } from "@/utils/utils";

const getUserListFun = (internalInstance: any) => {
  return [
    {
      label: "手机号",
      prop: "phone",
      formatter: formatterPhone,
    },
    {
      label: "邮箱",
      prop: "email",
    },
    {
      label: "昵称",
      prop: "username",
    },
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "身份证号",
      prop: "idcard",
    },
    {
      label: "头像",
      prop: "image",
      formatter: (row: any, column: any, cellValue: any, index: any) => {
        return h(
          ElButton,
          {
            onClick: (event: any) => {
              // 停止事件传播
              event.stopPropagation();
              // 阻止该元素默认事件
              event.preventDefault();
              internalInstance.setupState.aa();
            },
          },
          {
            default: () => {
              return 1111;
            },
          }
        );
      },
    },
    {
      label: "时间",
      prop: "time",
    },
    {
      label: "操作",
      prop: "operation",
      fixed: "right",
      formatter: (row: any, column: any, cellValue: any, index: any) => {
        return h(
          ElButton,
          {
            onClick: (event: any) => {
              // 停止事件传播
              event.stopPropagation();
              // 阻止该元素默认事件
              event.preventDefault();
              internalInstance.setupState.redact();
            },
          },
          {
            default: () => {
              return "编辑";
            },
          }
        );
      },
    },
  ];
};
export { getUserListFun };
