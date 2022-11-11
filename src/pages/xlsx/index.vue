<template>
    <div v-if="sheets.length">
            <u-picker :defaultIndex="defaultIndex" v-if="pShow" :itemHeight="100" :show="pShow" @confirm="pickerConfirm" :columns="[sheets]"></u-picker>
		<u-button @click="showPicker">{{filterText||'选择地区'}}</u-button>
        <div>当前一共有 <span style="color: red;">{{tatal}}</span> 条关于英语的数据</div>
        <div class="table">
            <div v-for="(item, index) in activeList" :style="{backgroundColor:index%2?'rgb(221, 221, 221)':'rgb(238, 238, 238)'}" :key="index" class="table-container">
                <template v-for="(key, index) in item" :key="index">
                    <div v-html="key"></div>
                </template>
                <!-- <div v-html="item.__EMPTY" v-if="item.__EMPTY"></div>
                <div v-html="item.__EMPTY_1" v-if="item.__EMPTY_1"></div>
                <div v-html="item.__EMPTY_2" v-if="item.__EMPTY_2"></div>
                <div v-html="item.__EMPTY_3" v-if="item.__EMPTY_3"></div>
                <div v-html="item.__EMPTY_4" v-if="item.__EMPTY_4"></div>
                <div v-html="item.__EMPTY_5" v-if="item.__EMPTY_5"></div>
                <div v-html="item.__EMPTY_6" v-if="item.__EMPTY_6"></div>
                <div v-html="item.__EMPTY_7" v-if="item.__EMPTY_7"></div>
                <div v-html="item.__EMPTY_8" v-if="item.__EMPTY_8"></div>
                <div v-html="item.__EMPTY_9" v-if="item.__EMPTY_9"></div>
                <div v-html="item.__EMPTY_10" v-if="item.__EMPTY_10"></div>
                <div v-html="item.__EMPTY_11" v-if="item.__EMPTY_11"></div>
                <div v-html="item.__EMPTY_12" v-if="item.__EMPTY_12"></div>
                <div v-html="item.__EMPTY_13" v-if="item.__EMPTY_13"></div>
                <div v-html="item.__EMPTY_14" v-if="item.__EMPTY_14"></div> -->
            </div>
        </div>
    </div>
    <div v-else>
        <u-button hover-class="button-hover" @click="add"> 选择文件 </u-button>
    </div>
</template>
<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
import xls from './xls'
console.log(xls);
const loading = ref(false)
const workbook = ref(null)
const sheets = ref([])
const pShow = ref(false)
const filterText = ref('')
const activeList = ref([])
const tatal = ref(0)
const defaultIndex = ref([0])
const add = () => {
  uni.chooseFile({
    type: "all",
    success: ({ tempFilePaths, tempFiles }) => {
      console.log(tempFilePaths);
      console.log(tempFiles[0]);
      readExportExcelFile(tempFiles[0])
    },
    fail: (error) => {
      console.log(error);
    }
  });
};
for (const key in xls) {
    sheets.value.push(key)
}
const readExportExcelFile = (file)=>{
    /* 读取Excel */
    const reader = new FileReader();
    reader.onloadstart = (e)=>{
        loading.value = e.target.readyState
    }
    reader.onprogress = (e)=>{
        loading.value = e.target.readyState
    }
    reader.onload = (e) => {
        /* 解析数据 */
        const bstr = e.target.result;
        workbook.value = XLSX.read(bstr, { type: 'binary'}); // 缓存 excel 解析内容
        sheets.value =  workbook.value.SheetNames; // 获取 缓存 excel 中所有表 （sheet ）
        console.log("导入成功！")
        console.log(workbook.value);
        console.log(sheets.value);
    }
    reader.onloadend = (e)=>{
        loading.value = e.target.readyState
    }
    reader.onerror = (e) =>{
        console.log(e,'文件读取时发生错误！');
        // proxy.$modal.msgError("文件读取时发生错误！")
    }
    reader.readAsBinaryString(file);
    return false;
}
const showPicker = () => {
    pShow.value = true
}
const pickerConfirm = (val) => {
    console.log(val.indexs[0]);
    defaultIndex.value = val.indexs
    filterText.value = val.value[0]
    const obj = xls[filterText.value]
    const arr = []
    let reg = /英语/
    xls[filterText.value].forEach((ele) => {
        for (const key in ele) {
            if (reg.test(ele[key])) {
                const temp =  arr.find(e=>e.__EMPTY===ele.__EMPTY)
                if (!temp) {
                    arr.push(ele)
                }

            }
        }
    });
    activeList.value = arr
    tatal.value = arr.length
    pShow.value = false
    // for (const key in obj) {
    //     console.log(key.charAt(0));
    // }
}
</script>
<style lang="less">
    .table{
        width: 100vw;
        overflow-x: scroll;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        .table-container{
            width: fit-content;
            display: flex;
            box-sizing: border-box;
            margin-top: 20rpx;
            background: #000;
            div{
                min-width: 300rpx;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10rpx;
                padding: 20rpx;
                border-right: 10rpx solid #fff;
            }
        }
    }
</style>
