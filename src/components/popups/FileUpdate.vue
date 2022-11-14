<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

class FileUnit {
  fileName: Ref<string>;
  constructor() {
    this.fileName = ref("");
  }

  // 取得上傳的 PDF 檔案
  changeFile() {
    const file = event?.target?.files[0];
    this.fileName.value = file.name;
    this.setFile(file);
  }

  dropOver() {
    const file = event?.dataTransfer.files[0];
    if (event?.dataTransfer.files[0].type.indexOf("pdf") === -1) {
      alert("僅支援副檔名 .pdf 檔案");
      return;
    }
    this.fileName.value = file.name;
    this.setFile(file);
  }

  // 檔案存到 vuex
  setFile(file: File) {
    store.dispatch("Files/setFile", { file: file });
  }
}

const fileUnit = new FileUnit();

// 目前有無檔案
const hasFile = computed(() => {
  if (fileUnit.fileName.value !== "") return false;
  else return true;
});
</script>

<template>
  <div id="file-update">
    <div class="inner">
      <img
        class="file-close"
        src="@/assets/images/other/pop-close.png"
        alt="關閉視窗按鈕"
      />
      <ul class="update-list">
        <li class="list-item">
          <p class="list-text"><span>1</span>檔案上傳</p>
        </li>
        <li class="list-item">
          <p class="list-text"><span>2</span>進行簽名</p>
        </li>
        <li class="list-item">
          <p class="list-text"><span>3</span>下載文件</p>
        </li>
      </ul>

      <div v-if="hasFile" class="container update-pdf">
        <div
          class="drop-box"
          @dragover.prevent
          @drop.prevent="fileUnit.dropOver"
        >
          <label>
            <input type="file" @change="fileUnit.changeFile" accept=".pdf" />
            <p class="file-btn">選擇檔案</p>
          </label>
          <p class="file-text">或拖曳檔案至此</p>
        </div>
      </div>

      <!-- <div v-if="false" class="container update-loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p class="loading-text">正在完成上傳....</p>
      </div> -->

      <div v-if="!hasFile" class="container create-task">
        <div class="task-box">
          <p class="task-text">任務名稱</p>
          <input class="task-input" type="text" />
        </div>
        <div class="task-box">
          <p class="task-text">上傳文件</p>
          <input
            class="task-input"
            type="text"
            readonly
            disabled
            :value="fileUnit.fileName.value"
          />
        </div>
      </div>

      <RouterLink 
        v-if="!hasFile" 
        class="update-submit" 
        :to="{ name: 'Sign' }"
      >
        確認
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#file-update {
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
    background-color: $color-orange;
    padding: 4vh 4vw 12vh;
    flex-direction: column;
    border-radius: 1.2vw;
    position: relative;
    > .update-list {
      @include flex();
      padding-bottom: 6vh;
      > .list-item {
        padding: 0 4%;
        > .list-text {
          @include flex();
          color: #fff;
          font-size: 1.2vw;
          white-space: nowrap;
          > span {
            @include flex();
            @include size(28px, 28px);
            border-radius: 100%;
            background-color: #fff;
            color: $color-orange;
            margin-right: 0.4vw;
          }
        }
      }
    }

    > .file-close {
      position: absolute;
      top: 0;
      width: 1.6vw;
      right: -2.4vw;
      cursor: pointer;
    }

    > .update-submit {
      position: absolute;
      background-color: $color-purple;
      color: #fff;
      padding: 1.2vh 2.4vw;
      font-size: 1.2vw;
      border-radius: 2vw;
      bottom: 4vh;
      border: none;
      text-decoration: none;
    }
  }
}

.container {
  @include size(48vh, 40vw);
  border-radius: 1.2vw;
  border: dashed 4px $color-orange;
}

.update-pdf {
  background-color: #fff;
  > .drop-box {
    @include flex();
    @include size(100%, 100%);
    flex-direction: column;
    background-color: #fff;
    border-radius: 1.2vw;
    > .file-text {
      font-size: 1.2vw;
      color: #ababab;
      padding: 2% 0;
    }
    > label {
      > .file-btn {
        font-size: 1.4vw;
        color: #000000;
        border-radius: 2vw;
        padding: 1vh 1.6vw;
        border: solid 4px $color-purple;
        cursor: pointer;
      }
    }
  }
  input {
    display: none;
  }
}

.update-loading {
  @include flex();
  flex-direction: column;
  background-color: #fff;
  > .loading-text {
    color: #535353;
    font-size: 1.4vw;
    padding-top: 4vh;
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 140px;
    height: 140px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 120px;
    height: 120px;
    margin: 8px;
    border: 10px solid $color-orange;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $color-orange transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.create-task {
  @include flex();
  flex-direction: column;
  background-color: #fff;
  padding: 0 4vw;
  > .task-box {
    width: 100%;
    padding: 2% 0;
    > .task-text {
      font-size: 1.2vw;
      padding: 1vh 0;
    }
    > .task-input {
      border: solid 4px $color-purple;
      width: 100%;
      border-radius: 0.8vw;
      box-sizing: border-box;
      padding: 2% 4%;
      font-size: 1.2vw;
      color: #535353;
      &:focus {
        outline: none;
      }
    }

    &:nth-child(2){
      > .task-input {
        cursor: not-allowed;
      }
    }
  }
}
</style>