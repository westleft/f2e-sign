<script setup lang="ts">
import { inject } from "vue";
import { useStore } from "vuex";
import { PopUnit, SignUnit } from "@/tools/classes"

const store = useStore();

const addToPDF = inject("addToPDF") as () => {}; // 將簽名檔新增至 PDF
const popUnit = inject("popUnit") as PopUnit;
const signUnit = inject("signUnit") as SignUnit;

// 簽名檔檔案
const signList: { date: number; img: string }[] =
  store.getters["Files/getSigns"];

// 選擇簽名檔
const selectSign = (sign: string) => {
  signUnit.selectSign(sign);
};



</script>

<template>
  <div id="select-sign">
    <div class="inner">
      <img
        class="file-close"
        src="@/assets/images/other/pop-close-p.png"
        alt="關閉視窗按鈕"
        @click="popUnit.changePop('')"
      />
      <h2 class="select-title">選擇簽名檔</h2>
      <div class="select-box">
        <div class="select-record">
          <h3 class="box-title">手寫紀錄</h3>
          <div
            :class="[
              'sign-box',
              { current: signUnit.sign.value === item.img },
            ]"
            v-for="item in signList"
            :key="item.date"
            @click="selectSign(item.img)"
          >
            <img :src="item.img" alt="簽名圖" />
          </div>
          <div class="sign-box" v-for="item in 3 - signList.length" :key="item">
            <p class="sign-box-text">再來創建一個吧</p>
          </div>
        </div>
        <div class="select-create">
          <h3 class="box-title">創建簽名</h3>
          <button class="write" @click="popUnit.changePop('sign')">
            手寫簽名檔
          </button>
          <button class="update">上傳圖檔</button>
        </div>
      </div>
      <div class="btn-box">
        <button class="submit-btn" @click="addToPDF">確認</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#select-sign {
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

    > .select-title {
      font-size: 1.2vw;
      padding-bottom: 4vh;
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

.select-box {
  @include flex(flex-start);
  width: 100%;
  > .select-record,
  .select-create {
    @include flex(center, flex-start);
    flex-direction: column;
    width: 50%;
    padding: 0 2vw;
    > .box-title {
      font-size: 1vw;
      padding-bottom: 1.2vh;
    }
  }

  > .select-record {
    > .sign-box {
      @include flex();
      @include size(8vh, 10vw);
      margin: 1.2vh 0;
      border: 4px solid #ababab;
      background-color: #e7e7e7;
      cursor: pointer;
      > img {
        @include size(100%, 100%);
        object-fit: cover;
        object-position: center;
      }

      > .sign-box-text {
        color: #fff;
        font-size: 1vw;
      }
    }
    .current {
      border: solid 4px $color-orange;
    }
  }

  > .select-create {
    @include flex();
    flex-direction: column;

    > button {
      width: 100%;
      height: 8vh;
      font-size: 1.2vw;
      padding: 0.8vh 2vw;
      border-radius: 2vw;
      color: #000000;
      border: none;
      margin: 1.2vh 0;
    }
    > .write {
      background-color: $color-orange;
      cursor: pointer;
    }

    > .update {
      background-color: #ed878a;
      cursor: not-allowed;
    }
  }
}

.btn-box {
  @include flex(center, flex-end);
  width: 100%;
  > .submit-btn {
    background-color: $color-purple;
    border-radius: 2vw;
    border: none;
    padding: 1.2vh 2vw;
    font-size: 1.2vw;
    color: #fff;
    cursor: pointer;
  }
}
</style>