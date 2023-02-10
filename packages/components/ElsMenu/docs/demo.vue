<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElDivider } from "element-plus";
import { ElsMenu, ElsMenuProps } from "../index";

const collapse = ref(false);

const menus = ref<ElsMenuProps["menus"]>([]);

setTimeout(() => {
  menus.value = [
    {
      id: 1,
      title: "A",
      type: "sub",
      children: [
        { id: 1.1, title: "A-1" },
        {
          id: 1.2,
          title: "A-G",
          type: "group",
          children: [{ id: "1.2.1", title: "A-G-1" }],
        },
      ],
    },
  ];
}, 2000);

//
</script>

<template>
  <div>
    <el-button type="primary" @click="collapse = !collapse">切换</el-button>
    <el-divider></el-divider>
    <els-menu :menus="menus" :collapse="collapse" />
  </div>
</template>
