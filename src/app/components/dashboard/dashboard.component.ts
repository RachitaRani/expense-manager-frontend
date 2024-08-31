import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatsService } from 'src/app/services/stats/stats.service';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  stats:any;
  expenses:any;
  income:any;

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  @ViewChild('myIncomneChart') private incomeChartRef:ElementRef;
  @ViewChild('myExpenseChart') private expenseChartRef:ElementRef;

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
   }

   createLineChart(){
    const incomectx = this.incomeChartRef.nativeElement.getContext('2d');

    new Chart(incomectx, {
      type: 'line',  //use 'bar' to create bar graph
      data: {
        labels: this.income.map(income => income.date), // use array of colors for bar graph ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
        datasets: [{
          label: 'Income',
          data: this.income.map(income => income.amount),
          borderWidth: 1,
          backgroundColor: 'rgba(80,200,120)',
          borderColor: 'rgba(0,100,0)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    //expense chart
    const expensectx = this.expenseChartRef.nativeElement.getContext('2d');

    new Chart(expensectx, {
      type: 'line',  //use 'bar' to create bar graph
      data: {
        labels: this.expenses.map(income => income.date), // use array of colors for bar graph ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
        datasets: [{
          label: 'Expenses',
          data: this.expenses.map(income => income.amount),
          borderWidth: 1,
          backgroundColor: 'rgba(255,0,0)',
          borderColor: 'rgba(255,0,0)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
   }

   getStats(){
    this.statsService.getStats().subscribe(res=>{
      console.log(res);
      this.stats = res;
    })
   }

   getChartData(){
    this.statsService.getChart().subscribe(res=>{
      if(res.expenseList != null && res.incomeList != null){
        this.income = res.incomeList;
        this.expenses = res.expenseList;
        console.log(res);

        this.createLineChart();
      }
    })
   }

}
