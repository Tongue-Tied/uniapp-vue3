import {
    createSSRApp
} from "vue";
// 引入 uView UI
import uviewPlus from 'uview-plus'
import App from "./App.vue";
export function createApp () {
    const app = createSSRApp(App);
    app.use(uviewPlus)
    // eslint-disable-next-line no-undef
    uni.$u.config.unit = 'rpx'
    return {
        app
    };
}
