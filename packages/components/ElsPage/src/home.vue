<script lang="ts" setup>
import { ref, computed, unref } from "vue";
import TempHome from "./temp-home.vue";
//
import {homeData as hd,introduceData as itd} from "./data"
// api
// import { getJsonFileData } from "@/api/base/json";

const homeData = ref<Record<string, any>>({});
const introduceData = ref<Record<string, any>>({});
//
const initHomeData = async () => {
  try {
    homeData.value = hd;
  } catch (e) {
    console.error(e);
  }
};
const initIntroduceData = async () => {
  try {
    introduceData.value = itd;
  } catch (e) {
    console.error(e);
  }
};
//
const init = () => {
  Promise.all([initHomeData(), initIntroduceData()]);
};
//
init();
// 图片名称处理
const transImgName = (name: string) => {
  if (!name) {
    return undefined;
  }
  let res = name;
  const reg = /^.*?\.(png|jpg|jpeg|bmp|gif)$/;
  if (!reg.test(res)) {
    res = res + ".png";
  }
  if (!/^\//.test(res) && !/^http/.test(res)) {
    res = "/image/home/" + res;
  }
  return res;
};
// 生成首页轮播
const carousel = computed(() => {
  const data = unref(homeData);
  const { CAROUSEL = [] } = data;
  return CAROUSEL.map((k: string) => transImgName(k));
});
// 生成悬浮图层
const layer = computed(() => {
  const data = unref(homeData);
  const { LAYER = { show: false } } = data;
  if (LAYER.icons) {
    LAYER.icons = LAYER.icons.map(({ img, ...t }: any) => ({
      ...t,
      img: transImgName(img),
    }));
  }
  return LAYER;
});
// 生成首页信息
const items = computed(() => {
  const data = unref(homeData);
  const list = unref(introduceData)?.SHOW ?? [];
  const { CONTENTS = [] } = data;
  return CONTENTS.map((k: string) => ({
    ...data[k],
    img: `/image/home/${k}.png`,
    link: list.includes(k) ? `/:lang/platform/introduce/${k}` : false,
  }));
});
</script>

<template>
  <div class="page-home">
    <temp-home :carousel="carousel" :layer="layer" :items="items"></temp-home>
  </div>
</template>

<style lang="scss">
.page-home {
  width: 100%;
  height: 100%;
}
</style>
