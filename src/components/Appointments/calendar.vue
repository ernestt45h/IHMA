<template>
  <div id="cal" class="cal col-12">
    <div class="cal-header bg-info text-light text-center"> 
        <span @click="switchMonth('prev')" class="left btn pull-left" id="prev"> &lang; </span>  
        <span class="month-year" id="label"><u>{{ label.month +" "+ label.year}}</u></span> 
        <span  @click="switchMonth('next')" class="right btn pull-right" id="next"> &rang; </span>
    </div>
    <table class="table text-center table-striped">
        <thead>
            <tr>
                <th scope="col">SUN</th>
                <th scope="col">MON</th>
                <th scope="col">TUE</th>
                <th scope="col">WED</th>
                <th scope="col">THU</th>
                <th scope="col">FRI</th>
                <th scope="col">SAT</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week, index) in days" :key="index">
                <td v-for="(day,index) in week" :key="index" :class="{'bg-info': isDate(day)}">{{day}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
//Fix all this the vue way
import jquery from "jquery";
global.$ = jquery



export default {
  name: 'calendar',
  props:['events'],
  data(){
      return{
        currentDate: {},
        label: {
            month: '',
            year: '',
        },
        months: [
            "January", "February", "March", "April", "May", "June",
            "July", "Augest", "September", "October", "November", "December"
        ],
        days:[],
        catcher: {}
      }
  },
  methods:{

    switchMonth(next, month, year) {
        var curr = [this.label.month, this.label.year],
        calendar, 
        tempYear = parseInt(curr[1], 10)

        

        // calculating for Month
        if(next){
            //If there is a date().getMonth() not given
            if (next == 'next') {
                //on next month clicked
                if(curr[0] == 'December'){
                    month = 0
                }else{
                    month = this.months.indexOf(curr[0]) + 1
                }
            }else{
                //on prev month clicked
                if(curr[0] == 'January'){
                    month = 11
                }else{
                    month = this.months.indexOf(curr[0]) - 1
                    }
            }
        }else{
            //If there is a date().getMonth() number assign it to month
            month = month
        }


        //check if we need to change to the next or previous year
        if (year) {
            year = year
        }else{
            if (next == 'next' && month === 0) {
                year = tempYear + 1
            }else if(next == 'prev' && month === 11){
                year = tempYear-1
            }else{
                year = tempYear
            }
        }

        this.days = this.createCal(year, month)
        this.label = {
            month: this.months[month],
            year: year
        }
    },
    
    createCal(year, month) {
        var day = 1

         if (this.catcher[year]) {
             if (this.catcher[year][month]) {
                 return this.catcher[year][month]
             }else{
                 this.catcher[year] = {}
             }
         }

        let startDay = new Date(year, month, day).getDay()
        let haveDays = true
        let calendar = []
        let i = 0
        let events = this.events
        let daysInMonth = [
            31,(((year%4===0)&& (year%100!==0))|| (year%400===0))  ? 29 : 28,31,30,31,30,31,31,30,31,30,31  
         ]

         while (haveDays) {
             calendar[i] = []            
             for (var j = 0; j < 7; j++) {
                 if (i === 0) {
                     if (j === startDay){
                         calendar[i][j] = day++
                         startDay++
                     }
                 }else if ( day <= daysInMonth[month]){
                    calendar[i][j] = day++
                 }
                 else{
                     calendar[i][j] = ""
                     haveDays = false
                 }
                 if (day > daysInMonth[month]) {
                     haveDays = false
                 }
             }
             i++
         }
         //console.log(calendar)
        return calendar
    },

    isDate(day, cal){

        cal = cal || {month:this.label.month,year:this.label.year}

        if (
            cal.month == this.currentDate.month &&
            cal.year == this.currentDate.year &&
            day == this.currentDate.day
        ) {
            return true
        }else{
            return false
        }
    },

  },

  created(){

      this.currentDate = {
        day: new Date().getDate(),
        month: this.months[new Date().getMonth()],
        year: new Date().getFullYear()
      }
      let month = new Date().getMonth()
      let year = new Date().getFullYear()
      this.label = {
          year: year,
          month: this.months[month]
      }
    this.switchMonth(null,month,year)
  }


}
</script>

<style scoped>

    .current{
        background: orange;
    }

    .cal{
        background: #fff;
        min-height:400px; 
        box-shadow: 0px 2px 3px 1px #ddd;
    }

    .cal-header{
        margin: -10px;
        min-height: 50px;
        box-shadow: 0px 2px 4px 0px #ddd;
    }

    .cal-header .left, .cal-header .right{
        margin-top: 5px;
        font-size: 20px;
    }

    .cal-header .month-year{
        font-size: 30px; 
    }

</style>


