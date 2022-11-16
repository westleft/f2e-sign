<script setup lang="ts">
import { inject } from "@vue/runtime-core";
import { useStore } from "vuex";
import { PopUnit } from "@/tools/classes"

const store = useStore();

const popUnit = inject("popUnit") as PopUnit;

// 檢查有沒有建立過簽名檔
const checkHasSign = () => {
  const signList = store.getters["Files/getSigns"];
  if(signList.length === 0){
    popUnit.changePop('sign');
  } else {
    popUnit.changePop('choose');
  }
}

</script>


<template>
  <div class="main-list">
    <img class="re-logo" src="@/assets/images/logos/sign-logo.png" alt="logo圖" />
    <ul class="list">
      <li class="list-item">
        <button 
          :class="['list-btn', { current: popUnit.current.value === 'sign' }]"
          @click="checkHasSign"
        >
          <img class="list-img" src="@/assets/images/listIcons/sign1.png" alt="簽名檔圖示" />
          簽名檔
        </button>
      </li>
      <li class="list-item">
        <button class="list-btn disabled">
          <img class="list-img" src="@/assets/images/listIcons/sign2.png" alt="加入日期圖示" />
          加入日期
        </button>
      </li>
      <li class="list-item">
        <button class="list-btn disabled">
          <img class="list-img" src="@/assets/images/listIcons/sign3.png" alt="文字編輯圖示" />
          文字編輯
        </button>
      </li>
    </ul>
    <img class="ill-icon" src="@/assets/images/listIcons/sign-illustration.png" alt="" />
  </div>
</template>


<style lang="scss" scoped>
.main-list {
  @include flex(center, space-between);
  @include size(100%, 12%);
  flex-direction: column;
  padding-right: 1.6vw;
  position: relative;
  > .re-logo {
    width: 90%;
    margin: 2vh 0;
  }
  > .list {
    width: 100%;
    > .list-item {
        width: 100%;
      > .list-btn {
        @include flex();
        width: 100%;
        border-right: none;
        margin: 2vh 0;
        padding: 4% 2%;
        border-radius: 2vw;
        text-decoration: none;
        background-color: #fff;
        color: #000;
        border: none;
        font-size: 1vw;
        line-height: 140%;
        cursor: pointer;
        > .list-img {
          width: 1.6vw;
          margin-right: 0.6vw;
        }        
      }

      .current {
        color: #fff;
        background-color: $color-purple;
        > .list-img {
          filter: invert(100%);
        }
      }

      .disabled {
        cursor: not-allowed;
      }
    }
    .router-link-active {
      background-color: #fff;
      border: solid 1px #fff;
      color: #000 !important;
      > .list-img {
        filter: invert(100%);
      }
    }
  }

  > .ill-icon {
    position: relative;
    bottom: -10vh;
    width: 14vw;
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