<template>
  <div class="els-exp-box">
    <div
      ref="boxRef"
      :class="[`_mode-${mode}`, { 'is-focus': isFocus }]"
      tabindex="1"
      @keydown="handleKeyup"
      @click.stop="handleDivClick"
      @focus="() => (isFocus = true)"
      @focusout="() => (isFocus = false)"
    >
      <template v-for="(v, i) in [...leftText, ...rightText]">
        <span v-if="i == leftText.length" class="els-cursor"></span>
        <kbd
          v-if="v != '\n'"
          @click.stop="(e) => handleClick(i, e)"
          :class="i + ''"
          >{{ v }}</kbd
        >
        <!-- <kbd v-else class="_br"></kbd> -->
        <br :class="i + ''" v-else />
      </template>
      <span v-if="rightText.length == 0" class="els-cursor"></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ElsExpBox",
};
</script>

<script lang="ts" setup>
import { ref, unref, watch, toRefs, onMounted } from "vue";

interface InitParams {
  input: (val: string) => void;
  resetPos: (index: number) => void;
}

interface Props {
  modelValue?: string;
  isEdit?: boolean;
  mode?: "text" | "box" | "border";
  init?: (params: InitParams) => void;
}

const emits = defineEmits<{
  (e: "init", params: InitParams): void;
  (e: "update:modelValue", val: string): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  mode: "text",
  isEdit: true,
});
const boxRef = ref<HTMLDivElement>();
const { modelValue, isEdit, mode } = toRefs(props);
const isFocus = ref(false);
let cacheValue = "";
const leftText = ref<string[]>([]);
const rightText = ref<string[]>([]);

const cursorMove = (d: "up" | "down") => {
  if (!boxRef.value) {
    return;
  }
  const { children } = boxRef.value;
  const index = unref(leftText).length;
  const target = children[index] as HTMLElement;
  const {
    offsetLeft: x,
    offsetTop: y,
    offsetHeight: h,
    offsetWidth: w,
    tagName,
  } = target;
  const my = d == "up" ? y - h / 2 : y + h + h / 2;
  const mx = x;
  // console.log(x,y,w,h,mx,my,tagName)
  my > 0 && resetByPos(mx, my);
};
//

const resetLeftText = (index: number) => {
  const t = [...leftText.value, ...rightText.value];
  const ml = t.length;
  if (index > ml) {
    index = ml;
  } else if (index < 0) {
    index = ml + 1 - index;
  }
  const l = t.slice(0, index);
  const r = t.slice(index);
  leftText.value = l;
  rightText.value = r;
};
const resetByPos = (mx: number, my: number) => {
  if (!boxRef.value) {
    return;
  }
  const { children } = boxRef.value;
  let dis = -1;
  let pos = -1;
  let cd = 0;
  for (let i = 0, l = children.length; i < l; i++) {
    const elem = children[i] as HTMLElement;
    const {
      tagName,
      offsetLeft: x,
      offsetTop: y,
      offsetWidth: w,
      offsetHeight: h,
    } = elem;
    if (tagName == "SPAN") {
      cd = i;
    }
    if (tagName == "KBD" && my >= y && my <= y + h) {
      const d = mx - x;
      const td = Math.abs(d);
      if (dis == -1) {
        dis = td;
        pos = d > w / 2 ? i + 1 : i;
      } else if (td < dis) {
        dis = td;
        pos = d > w / 2 ? i + 1 : i;
      }
    }
  }

  if (pos == -1) {
    let dh = 0;
    let di = 0;
    for (let i = 0, l = children.length; i < l; i++) {
      const elem = children[i] as HTMLElement;
      const { tagName, offsetTop: y, offsetHeight: h } = elem;

      if (h > 0) {
        di = i;
        dh = h;
        dis = y + h;
      } else if (i - di > 1) {
        dis = dis + dh;
      }
      if (my >= dis) {
        pos = i + 1;
      } else {
        break;
      }
    }
  }
  if (pos >= 0 && cd < pos) {
    pos--;
  }
  resetLeftText(pos);
};
const handleDivClick = (e: MouseEvent) => {
  const { offsetX: mx, offsetY: my } = e;
  resetByPos(mx, my);
  // console.log(mx,my,pos,dis)
};
const handleClick = (i: number, e: MouseEvent) => {
  const { offsetX } = e;
  const kbd: HTMLElement = e.target as any;
  let cd = 1;
  if (offsetX && kbd) {
    const { offsetWidth } = kbd;
    if (offsetX < offsetWidth / 2) {
      cd = 0;
    }
  }
  console.log(i);
  resetLeftText(i + cd);
};
const handleKeyup = (e: KeyboardEvent) => {
  if (!isEdit.value) {
    return;
  }
  const key = e.key;
  addValue(key);
};

const addValue = (val: string) => {
  console.log("===addValue===>", val);
  switch (val) {
    case "Enter":
      leftText.value.push("\n");
      break;
    case "Space":
      leftText.value.push(" ");
      break;
    case "Backspace":
      leftText.value.pop();
      break;
    case "Delete":
      leftText.value.pop();
      break;
    case "Home":
      resetLeftText(0);
      break;
    case "End":
      resetLeftText(-1);
      break;
    case "ArrowLeft":
      resetLeftText(leftText.value.length - 1);
      break;
    case "ArrowRight":
      resetLeftText(leftText.value.length + 1);
      break;
    case "ArrowUp":
      cursorMove("up");
      break;
    case "ArrowDown":
      cursorMove("down");
      break;
    default:
      leftText.value.push(val);
  }
  emitUpdateModelValue();
};

const emitUpdateModelValue = () => {
  const val = [...unref(leftText), ...unref(rightText)].join("");
  cacheValue = val;
  emits("update:modelValue", cacheValue);
};

document.onkeydown = (e) => {
  const code = e.code;
  console.log(code);
  const ex = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"];
  if (ex.includes(code)) {
    return false;
  }
};

watch(modelValue, (v) => {
  if (v == cacheValue) {
    return;
  }
  cacheValue = v;
  //
  leftText.value = v.split("");
});
const params: InitParams = {
  input: addValue,
  resetPos: resetLeftText,
};
//
onMounted(() => {
  emits("init", params);
  if (props.init) {
    props.init(params);
  }
});

defineExpose(params);
</script>

<style scoped lang="scss">
.els-exp-box {
  min-height: 30px;
  height:100%;
  > div {
    outline: none;
    box-sizing: border-box;
    width: 100%;
    // display: flex;
    height: 100%;
    // flex-wrap: wrap;
    line-height: 1.5em;
    overflow: auto;
    padding:0 8px;
    position: relative;
    border:1px solid transparent;
    border-radius: 4px;
    word-wrap: break-word;
    &.is-focus {
      border-color: #409eff;
      box-shadow:0 0 2px 0 #409eff;
      
    }
    &._mode-text {
      > kbd {
        border: none;
        padding: 0;
      }
    }
    &._mode-box {
      > kbd {
        padding: 0px 8px;
      }
    }
    &._mode-border {
      > kbd {
        border: 1px solid #ddd;
        padding: 0px 8px;
      }
    }
    // overflow-wrap: break-word;
    // letter-spacing:1em;
    .els-cursor {
      // display: inline-block;
      padding: 0 1px;
      background: #000;
      animation: twinkle 0.5s infinite alternate;
      // margin: 0 2px;
    }
    > kbd {
      font-size: 16px;
      // display: inline-block;
      padding: 4px 8px;
      &._br {
        // flex:1 0 auto;
        // width:100%;
        // float:right;
        // clear: both;
      }
    }
  }
}

@keyframes twinkle {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
