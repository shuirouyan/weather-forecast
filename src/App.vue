<template>
    <div>
        <el-container class="container">
            <el-header>
                <el-input placeholder="请输入" class="input" v-model="city">
                    <template #title>城市名：</template>
                </el-input>
            </el-header>
            <el-main class="main">
                <div class="today">
                    今天：
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

import { reactive, ref } from 'vue'
export default {
    name: 'App',
    components: {

    },
    setup() {
        let city = ref('')
        let todayData = reactive({
            weather: '',
            direct: '',
            temperature: '',
            data: []
        })
        let realtime = reactive({
            temperature: '',
            info: '',
            direct: '',
            power: ''
        })
        let futureData = reactive([])
        let pic = ref('')

        return { city, todayData, pic, realtime, futureData }
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
