// 通用报表组件
<template>
  <div id="erd-table">
    <!-- 报表 -->
    <el-table
      id="el-table"
      :data="tableList"
      :border="border"
      :stripe="stripe"
      :height="height || erdHeight"
      :max-height="maxHeight || erdHeight"
      :style="{ width: tableWidth }"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
    >
      <el-table-column
        v-for="(item, index) in tableHerder"
        :label="item.label"
        :prop="item.prop"
        :width="item.width || ''"
        :min-width="item.minWidth || ''"
        :fixed="item.fixed || false"
        :sortable="item.sortable || false"
        :resizable="item.resizable || true"
        v-show="item.show || true"
        :show-overflow-tooltip="item.showOverflowTooltip || true"
        :align="item.align || ''"
        :formatter="item.formatter || formatter"
        :key="index"
      >
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="table-pegination"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
import { formatter } from "@/utils/utils";

export default defineComponent({
  props: {
    /**
     * tableHerder 表头
     * getTableData 获取报表数据接口函数
     */
    tableHerder: {
      type: Array,
      required: true,
      default: ref([]),
      /** 针对对应字段的列
       * label 显示的标题
       * prop 对应列内容的字段名
       * with 对应列的宽度
       * minWidth 对应列的最小宽度
       * fixed 列是否固定在左侧或者右侧
       * sortable 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序
       * resizable 对应列是否可以通过拖动改变宽度
       * show 是否展示字段
       * showOverflowTooltip 当内容过长被隐藏时显示 tooltip
       * align 对齐方式
       * formatter 用来格式化内容
       */
    },
    getTableData: {
      type: Function,
      required: true,
    },
    /** 针对整个Table的属性操作（可对照element）
     * border 是否带有纵向边框
     * stripe 是否为斑马纹
     * height Table高度，默认为自动高度
     * maxHeight Table的最大高度
     * tableWidth Table宽度
     * size Table的尺寸
     * fit 列的宽度是否自撑开
     * showHeader 是否显示表头
     * highlightCurrentRow 是否要高亮当前行
     */
    border: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
    },
    maxHeight: {
      type: [Number, String],
    },
    tableWidth: {
      type: String,
      default: "100%",
    },
    size: {
      type: String,
    },
    fit: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // data
    // 报表高度
    const erdHeight = ref();
    // 报表数据
    const tableList = ref([]);
    // 报表数据-总条数
    const tableTotal = ref(0);
    // 分页器-当前页数
    const page = ref(1);
    // 分页器-当前每页条数-可选值
    const pageSizes = ref([10, 20, 50, 100, 500]);
    // 分页器-当前每页条数
    const pageSize = pageSizes.value[0];
    // 获取报表数据-接口传参
    const getParams = reactive({
      page: page.value,
      pageSize: pageSize,
    });

    // 方法：methods
    // 获取报表数据
    const getTableData = () => {
      props.getTableData(getParams).then(({ data: { list, total } }: any) => {
        tableList.value = list;
        tableTotal.value = total;
      });
    };

    // 监听分页器-每页条数变化
    const handleSizeChange = (val: any) => {
      getParams.page = 1;
      getParams.pageSize = val;
      getTableData();
    };

    // 监听分页器-页数变化
    const handleCurrentChange = (val: any) => {
      getParams.page = val;
      getTableData();
    };

    // 生命周期
    getTableData();

    onMounted(() => {
      // 动态设置报表高度
      const erd = elementResizeDetectorMaker();
      erd.uninstall(document.getElementById("content-main"));
      erd.listenTo(document.getElementById("content-main"), (elMain: any) => {
        const elTable = document.getElementById("el-table");
        if (!props.height && elTable) {
          // 报表高度 = 内容main的高度 - 报表到main顶部距离 - 报表到底部距离（内容区域padding-bottom:20px + 分页器所占内容区域高度）
          erdHeight.value = elMain.offsetHeight - elTable.offsetTop - 20 - 42;
        }
      });
    });

    // 抛出
    return {
      erdHeight,
      tableList,
      tableTotal,
      page,
      pageSizes,
      pageSize,
      formatter,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
#erd-table {
  .table-pegination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
