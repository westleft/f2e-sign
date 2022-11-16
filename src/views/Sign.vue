<script setup lang="ts">
import SignList from "@/components/lists/SignList.vue";
import WriteSign from "@/components/popups/WriteSign.vue";
import ChooseSign from "@/components/popups/ChooseSign.vue";

// plugin
import { onMounted, provide, Ref, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { fabric } from "fabric";

// composables
import { useCanvas } from "@/composables/canvas";
import { useReadPDF, usePdfDownloader } from "@/composables/pdf";

import { PopUnit, SignUnit } from "@/tools/classes"

const store = useStore();
const router = useRouter();

const { PdfReader } = useReadPDF();
const { CanvasUnit, cannvasDOM } = useCanvas();
const { downloadPDF } = usePdfDownloader();

let canvasUnit: typeof CanvasUnit;
let pdfReader: InstanceType<typeof PdfReader>;

onMounted(() => {
  renderPDF();
});

// 上傳 PDF 顯示到畫面上
const renderPDF = () => {
  // 沒檔案? 給我滾回首頁
  const files = store.getters["Files/getFiles"];
  if (files.length === 0) {
    router.push({ name: "Home" });
    return;
  }
  const file = store.getters["Files/getFiles"][0]["file"];
  const fabricCan = new fabric.Canvas("canvas");
  pdfReader = new PdfReader(fabricCan);
  pdfReader.pdfEvent(file);
};

const addToPDF = () => {
  signUnit.addToPDF(pdfReader);
  popUnit.changePop("");
}

const download = () => {
  downloadPDF(pdfReader.canvas);
}

const popUnit = new PopUnit();
const signUnit = new SignUnit();

provide("addToPDF", addToPDF);
provide("popUnit", popUnit);
provide("signUnit", signUnit);

</script>

<template>
  <div id="sign">
    <SignList />
    <div class="sign-content">
      <div class="content-bar">
        <TransitionGroup tag="div">
          <WriteSign v-if="popUnit.current.value === 'sign'" />
          <ChooseSign v-if="popUnit.current.value === 'choose'" />
        </TransitionGroup>
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
        <canvas
          ref="cannvasDOM"
          id="canvas"
          style="box-shadow: 0px 0px 4px 4px #d8d8d8"
        ></canvas>
      </div>
      <img
        class="download-pdf"
        @click="download"
        src="@/assets/images/other/download.png"
        alt="下載pdf圖示"
      />
    </div>
  </div>
</template>

<style lang="scss">
#sign {
  @include flex();
  @include size(100%, 100%);
  background-color: $color-orange;
  // background-color: #fff;
  border-radius: 2vw;
  padding: 2vw;
}

.sign-content {
  @include size(100%, 88%);
  background-color: #fff;
  border-radius: 2vw;
  padding: 4vh 2vw 6vh;
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
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    padding: 4vh 0;
    &::-webkit-scrollbar {
      opacity: 0;
    }
  }
}

.download-pdf {
  @include size(4vw, 4vw);
  position: absolute;
  bottom: 4vh;
  right: 2.8vw;
  cursor: pointer;
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