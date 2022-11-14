<template>
  <div class="main-list">
    <img class="re-logo" src="@/assets/images/logos/re-logo.png" alt="" />
    <ul class="list">
      <li class="list-item">
        <RouterLink class="list-link selected" :to="{ name: 'Home' }">
          <img class="list-img" src="@/assets/images/listIcons/main1.png" alt="" />
          待自己簽署
        </RouterLink>
      </li>
      <li class="list-item">
        <RouterLink class="list-link" :to="{ name: 'Test' }">
          <img class="list-img" src="@/assets/images/listIcons/main2.png" alt="" />
          待他人簽署
        </RouterLink>
      </li>
      <li class="list-item">
        <RouterLink class="list-link" :to="{ name: 'Test' }">
          <img class="list-img" src="@/assets/images/listIcons/main3.png" alt="" />
          已完成
        </RouterLink>
      </li>
      <li class="list-item">
        <RouterLink class="list-link" :to="{ name: 'Test' }">
          <img class="list-img" src="@/assets/images/listIcons/main4.png" alt="" />
          已取消
        </RouterLink>
      </li>
      <li class="list-item">
        <RouterLink class="list-link" :to="{ name: 'Test' }">
          <img class="list-img" src="@/assets/images/listIcons/main5.png" alt="" />
          草稿
        </RouterLink>
      </li>
    </ul>

    <ul class="sub-list">
      <li class="list-item">
        <RouterLink class="list-link archive" :to="{ name: 'Test' }">
          <img class="list-img" src="@/assets/images/listIcons/main6.png" alt="" />
          封存
        </RouterLink>
      </li>
      <li class="list-item">
        <RouterLink class="list-link trash" :to="{ name: 'Test' }">
          <img class="list-img" src="@/assets/images/listIcons/main7.png" alt="" />
          垃圾桶
        </RouterLink>
      </li>
    </ul>

    <img class="ill-icon" src="@/assets/images/listIcons/main-illustration.png" alt="" />
  </div>
</template>


<style lang="scss" scoped>
.main-list {
  @include flex(center, flex-start);
  @include size(100%, 12%);
  flex-direction: column;
  padding-left: 0.6vw;
  position: relative;
  > .re-logo {
    width: 90%;
    margin: 2vh 0;
  }
  > .list,
  .sub-list {
    width: 100%;
    > .list-item {
      > .list-link {
        @include flex(center, flex-start);
        border: solid 1px $color-orange;
        border-right: none;
        margin: 1.4vh 0;
        padding: 3% 0 3% 8%;
        border-radius: 2vw 0 0 2vw;
        text-decoration: none;
        > .list-img {
          width: 1.6vw;
          margin-right: 0.6vw;
        }

        color: #fff;
        font-size: 1vw;
        line-height: 140%;
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

  .sub-list {
    margin: 4vh 0 2vh;
    > .list-item {
      .archive {
        border: solid 1px #ed878a !important;
        border-radius: none;
      }
      .trash {
        border: solid 1px #68c2f7 !important;
        border-radius: none;
      }
    }
  }

  > .ill-icon {
    position: relative;
    bottom: 0vh;
    width: 14vw;
  }
}
</style>