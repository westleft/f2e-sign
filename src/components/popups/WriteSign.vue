<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
import { useStore } from "vuex";
import { useCanvas } from "@/composables/canvas";
import { PopUnit } from "@/tools/classes"

const popUnit = inject("popUnit") as PopUnit;
const store = useStore();

const { CanvasUnit, cannvasDOM } = useCanvas();
let canvasUnit: InstanceType<typeof CanvasUnit>

onMounted(() => {
  canvasUnit = new CanvasUnit(cannvasDOM.value);
});

// 重製簽名檔
const reset = () => {
  canvasUnit.reset();
};

// 儲存簽名檔
const saveSign = () => {
  const signImage = canvasUnit.saveImage();
  store.dispatch("Files/setSign", { date: Date.now(), img: signImage })
  popUnit.changePop('choose')
  console.log(store.getters["Files/getSigns"])
}

// 筆刷顏色
const currentColor = ref("#000000");
const colorList = [
  { name: "blue", color: "#68c2f7" },
  { name: "red", color: "#eb4d3e" },
  { name: "black", color: "#000000" },
];

const changeColor = (color: string) => {
  currentColor.value = color;
  canvasUnit.changeStrokeColor(color);
};

</script>

<template>
  <div id="write-sign">
    <div class="inner">
      <img
        class="file-close"
        src="@/assets/images/other/pop-close-p.png"
        alt="關閉視窗按鈕"
        @click="popUnit.changePop('')"
      />
      <h2 class="write-title">手寫簽名檔</h2>
      <canvas ref="cannvasDOM" id="canvas" width="500" height="250"></canvas>
      <div class="text-box">
        <p class="clear-text" @click="reset">清除重寫</p>
        <ul class="color-list">
          <li
            v-for="color in colorList"
            :key="color.name"
            :class="[
              'list-item',
              color.name,
              { current: currentColor === color.color },
            ]"
             @click="changeColor(color.color)"
          ></li>
        </ul>
        <button class="submit-btn" @click="saveSign">儲存</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#write-sign {
  @include flex();
  @include size(100%, 100%);
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1;
  border-radius: 2vw;
  > .inner {
    @include flex();
    background-color: #fff;
    padding: 4vh 4vw;
    flex-direction: column;
    border-radius: 1.2vw;
    position: relative;
    border: solid $color-purple 4px;
    > .write-title {
      font-size: 1.2vw;
      padding-bottom: 4vh;
    }

    > #canvas {
      background-color: #e7e7e7;
      outline: dashed 4px $color-orange;
      border-radius: 1.2vw;
    }

    > .file-close {
      position: absolute;
      top: 0;
      width: 1.6vw;
      right: -2.4vw;
      cursor: pointer;
    }
  }
}

.text-box {
  @include flex(center, space-between);
  width: 100%;
  padding-top: 2vh;
  > .color-list {
    @include flex();
    padding: 4vh 0;
    > .list-item {
      @include size(36px, 36px);
      border-radius: 50%;
      margin: 0 0.4vw;
      border: solid 4px #fff;
    }
    & .current {
      border: solid 4px $color-orange;
    }
    & .blue {
      background-color: #68c2f7;
    }
    & .red {
      background-color: #eb4d3e;
    }
    & .black {
      background-color: #000000;
    }
  }

  > .clear-text {
    font-size: 1.2vw;
    color: #535353;
    cursor: pointer;
  }

  > .submit-btn {
    background-color: $color-purple;
    color: #fff;
    border: none;
    border-radius: 2vw;
    padding: 0.4vh 2vw;
    font-size: 1.2vw;
  }
}
</style>