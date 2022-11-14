<script setup lang="ts">
import SignList from "@/components/lists/SignList.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex"

import { useCanvas } from "@/composables/canvas";

import { fabric } from "fabric";
import { useReadPDF, usePdfDownloader } from "@/composables/pdf";

const store = useStore();

const { PdfReader } = useReadPDF();

const { CanvasUnit, cannvasDOM } = useCanvas();
const paintDOM = ref();
const singImage = ref();

let canvasUnit: typeof CanvasUnit;
let pdfReader: typeof PdfReader;

// 上傳 PDF 顯示到畫面上
onMounted(() => {
    const file = store.getters["Files/getFiles"][0]["file"] 
    console.log(file)
    const fabricCan = new fabric.Canvas("canvas");
    pdfReader = new PdfReader(fabricCan);
    pdfReader.pdfEvent(file)
})
</script>

<template>
  <div id="sign">
    <SignList />
    <div class="sign-content">
      <!-- <Transition>
        <FileUpdate v-if="true" />
      </Transition> -->
      <div class="content-bar">
        <ul class="step-list">
          <li class="list-item">
            <p class="list-text"><span>1</span>上傳檔案</p>
            <img
              class="list-done-img"
              src="@/assets/images/other/ok.png"
              alt=""
            />
          </li>
          <li class="list-item">
            <p class="list-text"><span>2</span>進行簽名</p>
            <img
              class="list-done-img"
              src="@/assets/images/other/ok.png"
              alt=""
            />
          </li>
          <li class="list-item">
            <p class="list-text"><span>3</span>下載文件</p>
          </li>
        </ul>
      </div>

      <div class="sign-main-box">
        <canvas ref="cannvasDOM" id="canvas" style="box-shadow: 0px 0px 4px 4px #D8D8D8;"></canvas>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#sign {
  @include flex();
  @include size(100%, 100%);
  background-color: $color-orange;
  border-radius: 2vw;
  padding: 2vw;
}

.sign-content {
  @include size(100%, 88%);
  background-color: #fff;
  border-radius: 2vw;
  padding: 4vh 2vw;
  position: relative;
  > .content-bar {
    @include flex();
    width: 100%;
    border-bottom: solid 0.4vh $color-orange;
    padding-bottom: 2vh;

    > .step-list {
      @include flex();
      > .list-item {
        @include flex();
        padding: 0 2vw;
        > .list-done-img {
          width: 1.2vw;
        }
        > .list-text {
          @include flex();
          color: #ababab;
          font-size: 1.2vw;
          padding-right: 0.8vw;
          > span {
            @include flex();
            @include size(24px, 24px);
            border-radius: 50%;
            background-color: #ababab;
            color: #fff;
            margin-right: 0.4vw;
            line-height: 140%;
          }
        }
      }
    }
  }

  > .sign-main-box {
    @include flex(flex-start);
    overflow: scroll;
    height: 100%;
    width: 100%;
    padding: 4vh 0;
    > #canvas {
        min-width: 40vw;
    }
  }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>