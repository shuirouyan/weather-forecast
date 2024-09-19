<template>
    <div style="text-align: left">
        <el-container class="container">
            <el-header>
                <el-input placeholder="请输入" @keydown.enter="click" class="input" v-model="city">
                    <template #title>城市名：</template>
                </el-input>
            </el-header>
            <el-main class="main">
                <div class="today">
                    <span>{{ city }}</span>今天：
                    <span>{{ this.todayData.weather ?? this.pic }}{{ this.todayData.temperature ?? this.plc }}</span>
                    <span style="margin-left: 20px;">{{ this.todayData.direct ?? this.plc }}</span>
                    <span style="margin-left: 100px;">{{ this.todayData.data ?? this.plc }}</span>
                </div>
                <div class="real">
                    <span class="temp">{{ this.realtime.temperature ?? this.plc }}</span>
                    <span class="realinfo">{{ this.realtime.info ?? this.plc }}</span>
                    <span class="realinfo" style="margin-left: 20px;">{{ this.realtime.direct ?? this.plc }}</span>
                    <span class="realinfo" style="margin-left: 20px;">{{ this.realtime.power ?? this.plc }}</span>
                </div>
                <div class="real">
                    <span class="realinfo">空气质量：{{ this.realtime.aqi ?? this.plc }}</span>
                    <span class="realinfo" style="margin-left: 20px;">湿度：{{ this.realtime.humidity ?? this.plc }}</span>
                </div>
                <div class="future">
                    <div class="header">5日天气预报</div>
                    <el-table :data="futureData" style="margin-top: 30px;">
                        <el-table-column label="日期" prop="date"></el-table-column>
                        <el-table-column label="温度" prop="temperature"></el-table-column>
                        <el-table-column label="天气" prop="weather"></el-table-column>
                        <el-table-column label="风向" prop="direct"></el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
import { ElMessage } from 'element-plus';
export default {
    name: 'App',
    components: {

    },
    setup() {
        let num = ref(3)
        let city = ref('杭州')
        let weatherData = ref({})
        let todayData = ref({
            weather: '',
            direct: '',
            temperature: '',
            data: []
        })
        let realtime = ref({
            temperature: '',
            info: '',
            direct: '',
            power: ''
        })
        let futureData = ref([])
        let pic = ref('暂无数据')
        let plc = ref('')

        return { num, city, todayData, pic, realtime, futureData, weatherData, plc }
    },
    methods: {
        async requestData() {

            let city = encodeURI(this.city)
            let api = `/simpleWeather/query?city=${city}&key=aa6c8be7ab68b9417183d0daaf83e740`
            await this.axios.get(api).then((resp) => {
                let tempData = { "reason": "查询成功!", "result": { "city": "杭州", "realtime": { "temperature": "28", "humidity": "84", "info": "雷阵雨", "wid": "04", "direct": "东北风", "power": "3级", "aqi": "50" }, "future": [{ "date": "2024-09-10", "temperature": "23/34℃", "weather": "雷阵雨转中到大雨", "wid": { "day": "04", "night": "22" }, "direct": "东北风转北风" }, { "date": "2024-09-11", "temperature": "25/30℃", "weather": "小到中雨转小雨", "wid": { "day": "21", "night": "07" }, "direct": "东北风转北风" }, { "date": "2024-09-12", "temperature": "26/33℃", "weather": "雷阵雨转多云", "wid": { "day": "04", "night": "01" }, "direct": "东南风转南风" }, { "date": "2024-09-13", "temperature": "24/33℃", "weather": "晴", "wid": { "day": "00", "night": "00" }, "direct": "东风" }, { "date": "2024-09-14", "temperature": "25/32℃", "weather": "小雨", "wid": { "day": "07", "night": "07" }, "direct": "东风转持续无风向" }] }, "error_code": 0 }
                console.log('response.data:', resp.data, ' data:', JSON.stringify(resp.data))
                this.num += 1
                if (resp.data.error_code == 0) {
                    this.num = 0
                    this.weatherData = resp.data
                    this.todayData = this.weatherData.result.future[0]
                    this.realtime = this.weatherData.result.realtime
                    this.futureData = this.weatherData.result.future
                } else {
                    ElMessage({ type: 'warning', message: this.city + '天气查询，' + resp.data.reason, duration: 5000 })
                    this.city = '杭州'
                    if (this.num < 3) {
                        this.requestData()
                    }
                    this.weatherData = tempData
                    this.city = this.weatherData.result.city
                    this.todayData = this.weatherData.result.future[0]
                    this.realtime = this.weatherData.result.realtime
                    this.futureData = this.weatherData.result.future
                }
            })
        },
        click() {
            this.requestData()
            console.log('new date.')
        }
    },
    mounted() {
        const { proxy } = getCurrentInstance()
        proxy.axios.defaults.baseURL = '/myApi'
        this.requestData()
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.container {
    background: linear-gradient(rgb(13, 104, 188), rgb(54, 131, 195));
}

.input {
    width: 300px;
    margin-top: 20px;
}

.today {
    font-size: 20px;
    color: white;
}

.temp {
    font-size: 79px;
    color: white;
}

.realinfo {
    color: white;
}

.future {
    margin-top: 40px;
}

.header {
    color: white;
    font-size: 27px;
}
</style>
