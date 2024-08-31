import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from 'src/app/services/income/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary","Freelancing","Investment","Stocks","Bitcoin","Bank Transfer","Social Media","Others"];
  incomes:any;

  constructor(private fb:FormBuilder,
    private incomeService:IncomeService,
    private message:NzMessageService,
    private router:Router
  ) { }

  ngOnInit(){
    this.getAllIncomes();
    this.incomeForm = this.fb.group({
      title: [null,Validators.required],
      amount: [null,Validators.required],
      date: [null,Validators.required],
      category: [null,Validators.required],
      description: [null,Validators.required]
    })
  }

  submitForm(){
    this.incomeService.postIncome(this.incomeForm.value).subscribe(res=>{
      this.message.success("Income Added Successfully" ,{ nzDuration : 5000});
    },error=>{
      this.message.error("Error Adding Income" ,{ nzDuration : 5000});
    }
    )
  }

  getAllIncomes(){
    this.incomeService.getAllIncomes().subscribe(res=>{
      this.incomes = res;
      console.log(this.incomes);
    })
  }

  updateIncome(id:number){
    this.router.navigateByUrl(`/income/${id}/edit`);
  }

  deleteIncome(id:number){
    this.incomeService.deleteIncome(id).subscribe(res=>{
      this.message.success("Income deleted Successfully", {nzDuration: 5000});
      this.getAllIncomes();
    },error=>{
      this.message.error("Error while deleting Income", {nzDuration: 5000});
    })
}

}
