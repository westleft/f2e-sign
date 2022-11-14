<script setup lang="ts">
import { useCanvas } from "@/composables/canvas";
import { onMounted, ref } from "vue";
import { fabric } from "fabric";

import { useReadPDF, usePdfDownloader } from "@/composables/pdf";

const { PdfReader } = useReadPDF();

const { CanvasUnit, cannvasDOM } = useCanvas();
const paintDOM = ref();
const singImage = ref();

let canvasUnit: typeof CanvasUnit;
let pdfReader: typeof PdfReader;

// 將簽名檔儲存
const save = () => {
  canvasUnit.saveImage();
  singImage.value = canvasUnit.saveImage();
};

onMounted(() => {
  // canvas 簽字
  canvasUnit = new CanvasUnit(cannvasDOM.value);

  // 讀取 pdf 檔案
  const fabricCan = new fabric.Canvas("canvas2");
  pdfReader = new PdfReader(fabricCan);
});

// 上傳 PDF 顯示到畫面上
const event = (e) => {
  pdfReader.pdfEvent(e);
};

// 將簽名檔加到 canvas
const add = () => {
  if (!singImage.value) return;
  fabric.Image.fromURL(singImage.value, function (image) {
    image.top = 400;
    image.scaleX = 0.5;
    image.scaleY = 0.5;
    pdfReader.canvas.add(image);
  });
};

const { downloadPDF } = usePdfDownloader();

// 下載 PDF
const download = () => {
  downloadPDF(pdfReader.canvas);
};

</script>

<template>
<RouterView />
  <button @click="download">download</button>
  <button @click="add">加入</button>
  <input type="file" ref="input" @change="event" accept=".pdf" />
  <canvas ref="cannvasDOM" id="canvas" style="border: 1px solid #000"></canvas>

  <canvas ref="paintDOM" id="canvas2" style="border: 1px solid #000"></canvas>
  <button @click="save">save</button>
</template>

<style lang="scss" scoped>
</style>
