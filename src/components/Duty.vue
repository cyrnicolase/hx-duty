<template>
    <div>
        <h1 class="title">{{year}}</h1>
        <div class="body">
            <div class="year" v-for="i in 12">
                <div class="month">
                    <h2>{{i}}月</h2>
                </div>
                <ul class="weekdays">
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                </ul>
                <ul class="days">
                    <li v-for="day in months[i - 1]">{{day}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let d = new Date()
        return {
            year: d.getFullYear(),
            months: [],
        }
    },
    created: function() {
        this.init();
    },
    methods: {
        init() {
            let year = (new Date()).getFullYear();
            for (let i = 0; i < 12; ++i) {
                let d = new Date(year, i, 1);
                let t = new Date(year, i, 0);
                t = t.getDate();

                let begin_week = d.getDay();
                this.months[i] = [];
                for (let j = 0; j < begin_week; j++) {
                    this.months[i].push('');
                }

                for (let j = 1; j <= t; j++) {
                    this.months[i].push(j);
                }
            }

            console.log(this.months);
        }
    }
}
</script>

<style lang="stylus" scoped>
* {box-sizing:border-box;}
ul {list-style-type: none;}
body {font-family: Verdana,sans-serif;}

.title {
    text-align: center;
    font-size: 46px;
    margin: 0;
}

.body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.year {
    width: 20%;
    margin: 10px;
    padding: 10px 0;
}

.month {
    text-align: center;
    padding: 5px 15px;
    width: 100%;
    background: #1abc9c;
}

.weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #ddd;
}

.weekdays li {
    display: inline-block;
    width: 13%;
    color: #666;
    text-align: center;
}

.days {
    margin: 0;
    padding: 10px 0;
    background: #eee;
}

.days li {
    list-style-type: none;
    display: inline-block;
    width: 13%;
    text-align: center;
    margin-bottom: 5px;
    font-size: 16px;
    color: #777;
}

/* 添加不同尺寸屏幕的样式 */
@media screen and (max-width:720px) {
    .weekdays li, .days li {width: 13.1%;}
}
 
@media screen and (max-width: 420px) {
    .weekdays li, .days li {width: 12.5%;}
    .days li .active {padding: 2px;}
}
 
@media screen and (max-width: 290px) {
    .weekdays li, .days li {width: 12.2%;}
}
</style>
