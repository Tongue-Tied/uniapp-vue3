<template>
  <view class="content" :style="{
      background:checked?'#000':'#fff',
      color:checked?'#fff':'#000'
    }">
    <div class="m-title">
      <span>雾都夜话</span>
      <div class="dark-side">
        <span style="padding-right:4px">Dark</span>
        <u-switch size="30" inactive-color="#000" active-color="#fff" v-model="checked"></u-switch>
      </div>
    </div>
    <view class="m-scroll">
      <scroll-view scroll-y @scrolltolower="scrolltolower">
        <template v-for="(item,index) in mArr" :key="index">
          <view v-if="index<=count" class="s-item">
            <view class="item-title">{{item.time}}</view>
            <view class="item-content">{{item.content}}</view>
          </view>
        </template>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { arr } from '@/service/dataBase'
const count = ref(40)
const mArr = ref([])
const checked = ref(false)
mArr.value = arr.reverse()
onShow((e)=>{
    console.log(e);
});
const scrolltolower = () => {
  count.value += 10
}
</script>

<style lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .m-title{
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100vw;
    .dark-side{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0,-50%);
      display: flex;
      align-items: center;
    }
  }
  .m-scroll{
    scroll-view{
      height: 95vh;
      .s-item{
        margin: 40rpx 0;
        padding: 0 50rpx 40rpx 50rpx;
        // background: rgb(226, 198, 255);
        .item-title{
          text-align: center;
          padding: 40rpx 0;
        }
        .item-content{
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: justify;
        }
      }
    }
  }
}

</style>
