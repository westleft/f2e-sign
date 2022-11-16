<script setup lang="ts">
import MainList from "@/components/lists/MainList.vue";
import FileUpdate from "@/components/popups/FileUpdate.vue";
import { provide, ref } from "vue";

const updateBoxShowing = ref(false);
const showPop = ref(false);
provide("showPop", showPop)
</script>

<template>

  <div id="home" @click.capture="updateBoxShowing = false">
    <MainList />
    <div class="home-content">
      <Transition>
        <FileUpdate v-if="showPop" />
      </Transition>
      <div class="content-bar">
        <div class="search-box">
          <img
            class="search-icon"
            src="@/assets/images/home/seatch-icon.png"
            alt=""
          />
          <input class="search-input" type="text" placeholder="搜尋文件名稱" />
        </div>
      </div>

      <div class="update-content">
        <img
          class="update-img"
          src="@/assets/images/home/update-illustration.png"
          alt=""
        />
        <p class="update-text">上傳的文件將顯示於此</p>
      </div>

      <div class="update-btn">
        <img
          @click="updateBoxShowing = true"
          class="icon"
          src="@/assets/images/home/update-icon.png"
          alt=""
        />
        <Transition>
          <div v-if="updateBoxShowing" class="update-box">
            <img
              class="update-img"
              src="@/assets/images/home/update-box.png"
              alt=""
            />
            <div class="update-btn" @click="showPop = true">
              <img src="@/assets/images/home/update-sign1.png" alt="" />
              <p class="up-text">自己簽署<br /><span>唯一的簽署者</span></p>
            </div>
            <div class="update-btn other" disabled>
              <img src="@/assets/images/home/update-sign2.png" alt="" />
              <p class="up-text">
                邀請他人簽署<br /><span>指派簽署欄位給其他人</span>
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#home {
  @include flex();
  @include size(100%, 100%);
  background-color: $color-purple;
  border-radius: 2vw;
  padding: 2vw;
}

.home-content {
  @include size(100%, 88%);
  background-color: #fff;
  border-radius: 2vw;
  padding: 4vh 2vw;
  position: relative;
  > .content-bar {
    width: 100%;
    border-bottom: solid 0.4vh $color-purple;
    padding-bottom: 2vh;
    > .search-box {
      position: relative;
      > .search-icon {
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        width: 1vw;
        left: 0.8vw;
      }
      > .search-input {
        box-sizing: border-box;
        background-color: #e7e7e7;
        // color: #ABABAB;
        border-radius: 2vw;
        border: none;
        font-size: 1vw;
        padding: 1vh 0.6vw 1vh 2vw;
        &:focus {
          outline: none;
        }
      }
    }
  }

  > .update-content {
    @include flex();
    @include size(100%, 100%);
    flex-direction: column;
    > .update-img {
      width: 16vw;
    }

    > .update-text {
      font-size: 1vw;
      font-weight: 500;
      color: #535353;
      padding: 2% 0;
    }
  }
  > .update-btn {
    @include flex();
    @include size(3.2vw, 3.2vw);
    position: absolute;
    right: 2vw;
    bottom: 4vh;
    background-color: $color-orange;
    border-radius: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    > .icon {
      width: 70%;
      cursor: pointer;
    }
    > .update-box {
      @include flex(center, space-around);
      flex-direction: column;
      position: absolute;
      width: 14vw;
      // height: 100px;
      right: 0vw;
      bottom: 12vh;
      padding: 0 40%;
      > .update-img {
        position: absolute;
        width: 100%;
        z-index: 0;
      }

      > .update-btn {
        @include flex();
        z-index: 1;
        background-color: #ed878a;
        padding: 0 2vw;
        width: 100%;
        border-radius: 4vw;
        cursor: pointer;
        padding: 1.8vh 0;
        > img {
          width: 1.6vw;
          margin-right: 0.4vw;
        }
        > .up-text {
          font-size: 1.2vw;
          color: #fff;

          > span {
            font-size: 0.8vw;
          }
        }
      }

      > .other {
        background-color: $color-orange;
        margin: 2vh 0 4vh;
        cursor: not-allowed;
      }
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