<template>
    <div>
        <h1>轮班表</h1>
        <div class="month">
            <ul>
                <li class='prev' @click="btnPrev()"><</li>
                <li class='next' @click="btnNext()">></li>
                <li class='title'>{{month + 1}}月<br/>{{year}}</li>
            </ul>
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
            <li v-for="day in monthDays">
                <span class="header_sign">{{monthDuty[day - 1]}}</span><br>
                <span :class=getDayClass(day)>{{day}}</span><br>
                <span class="foot_sign">{{lunars[day - 1]}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import solarLunar from 'solarlunar';

export default {
    data() {
        let activeDate = new Date();
        return {
            curDate: activeDate.getDate(),
            year: activeDate.getFullYear(),
            month: activeDate.getMonth(),
            monthDays: [],
            activeDate: activeDate,
            monthDuty: [],
            weekends: [],
            holidays: {},
            lunars: [],
        }
    },
    created: function() {
        this.init();
    },
    methods: {
        init() {
            let i = this.month;
            let monthBegin = (new Date(this.year, i, 1)).getDay();
            let monthEnd = (new Date(this.year, i + 1, 0)).getDate();

            this.weekends = [];
            this.monthDays = [];
            this.lunars = [];
            for (let j = 0; j < monthBegin; ++j) {
                this.monthDays.push('');
            }

            let is_weekend = false;
            for (let j = 1; j <= monthEnd; ++j) {
                this.monthDays.push(j);
                let d = new Date(this.year, i, j);

                if (!is_weekend) {
                    let weekday = (new Date(this.year, i, j)).getDay();
                    if (0 == weekday) {
                        is_weekend = true;
                        this.weekends.push(j - 1); 
                        this.weekends.push(j); 
                        this.weekends.push(j + 6); 
                        this.weekends.push(j + 7); 
                        this.weekends.push(j + 13); 
                        this.weekends.push(j + 14); 
                        this.weekends.push(j + 20); 
                        this.weekends.push(j + 21); 
                        this.weekends.push(j + 27); 
                        this.weekends.push(j + 28); 
                        continue;
                    }

                    if (6 == weekday) {
                        is_weekend = true;
                        this.weekends.push(j);
                        this.weekends.push(j + 1);
                        this.weekends.push(j + 7);
                        this.weekends.push(j + 8);
                        this.weekends.push(j + 14);
                        this.weekends.push(j + 15);
                        this.weekends.push(j + 21);
                        this.weekends.push(j + 22);
                        this.weekends.push(j + 28);
                        this.weekends.push(j + 29);
                    }
                }
            }
            this.calc();
            // this.getHolidays();
        },
        calc() {
            // 序列: 白班, 值班, 下夜班, 正修
            // 2018-08-26 白班
            this.monthDuty = [];
            let map = ['白班', '值班', '下夜班', '正修']; 
            let refDate = new Date(2018, 7, 26);
            let monthBegin = new Date(this.year, this.month, 1);
            let diff = (refDate.getTime() - monthBegin.getTime()) / 86400000;
            let t = new Date(this.year, this.month + 1, 0).getDate();

            if (diff > 0) {
                let offset = (4 - diff % 4) % 4;
                for (let i = 0; i < t; ++i) {
                    this.monthDuty.push(map[(offset + i) % 4]);

                    let lunar = solarLunar.solar2lunar(this.year, this.month + 1, i + 1);
                    this.lunars.push(lunar.dayCn == '初一' ? lunar.monthCn : lunar.dayCn);
                }
            } else {
                diff = Math.abs(diff);
                let offset = diff % 4;
                for (let i = 0; i < t; ++i) {
                    this.monthDuty.push(map[(offset + i) % 4]); 

                    let lunar = solarLunar.solar2lunar(this.year, this.month + 1, i + 1);
                    this.lunars.push(lunar.dayCn == '初一' ? lunar.monthCn : lunar.dayCn);
                }
            }
        },
        getHolidays() {
            let month = parseInt(this.month) + 1;
            if (month < 10) {
                month = this.year + '0' + month; 
            }

            this.holidays = [];
            this.$http.get('http://www.easybots.cn/api/holiday.php?m=' + month).then(res => {
                this.holidays = res.body[month];
            });
        },
        getDayClass(day) {
            if (this.curDate == day) {
                return 'active';
            }

            if (this.weekends.indexOf(day) > -1) {
                return 'holiday';
            }

            if (this.holidays[day] !== undefined) {
                return 'holiday';
            }

            return '';
        },
        btnPrev() {
            this.month -= 1;
            this.curDate = null;
            if (this.month < 0) {
                this.month = 11;
                this.year -= 1;
            }

            if (this.month == this.activeDate.getMonth() 
                && this.year == this.activeDate.getFullYear()) {
                this.curDate = this.activeDate.getDate();
            }

            this.init();
        },
        btnNext() {
            this.month += 1;
            this.curDate = null;
            if (this.month > 11) {
                this.month = 0;
                this.year += 1;
            }

            if (this.month == this.activeDate.getMonth() 
                && this.year == this.activeDate.getFullYear()) {
                this.curDate = this.activeDate.getDate();
            }

            this.init();
        },
    }
}
</script>

<style lang="stylus" scoped>
* {box-sizing: border-box;}
ul {list-style-type: none;}

.month {
    padding: 70px 25px;
    width: 100%;
    background: #1abc9c;
}
.month ul {
    margin: 0;
    padding: 0;
}

.month ul li {
    color: white;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 20px;
}
.month .prev {
    float: left;
    padding-top: 10px;
}

.month .title {
    text-align: center;
}

.month .next {
    float: right;
    padding-top: 10px;
}

.weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #ddd;
    font-size: 0;
}

.weekdays li {
    display: inline-block;
    font-size: 18px;
    width: 13.6%;
    color: #666;
    text-align: center;
}

.days {
    margin: 0;
    padding: 10px 0;
    background-color: #eee;
}

.days li {
    list-style-type: none;
    display: inline-block;
    width: 13.6%;
    text-align: center;
    padding-bottom: 5px;
    font-size: 16px;
    color: #777;
}

.days li .active {
    width: 20px;
    display: inline-block;
    padding: 5px;
    background: #1abc9c;
    color: white !important;
}

.days li .foot_sign {
    font-size: 10px;
}

.days li .header_sign {
    font-size: 10px;
}

.days li .holiday {
    width: 20px;
    display: inline-block;
    padding: 5px;
    padding: 5px;
    background:#63B8FF;
    color: white !important;
}

/* 添加不同尺寸屏幕的样式 */
@media screen and (max-width:720px) {
    .weekdays li, .days li {width: calc(100% / 7);}
}
 
@media screen and (max-width: 420px) {
    .weekdays li, .days li {width: calc(100% / 7);}
    .days li .active {padding: 2px;}
    .days li .holiday {padding: 2px;}
}
 
@media screen and (max-width: 290px) {
    .weekdays li, .days li {width: calc(100% / 7);}
}
</style>
