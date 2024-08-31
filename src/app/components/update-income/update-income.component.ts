import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from 'src/app/services/income/income.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit {

  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary","Freelancing","Investment","Stocks","Bitcoin","Bank Transfer","Social Media","Others"];
  incomes:any;
  id:number = this.activatedRoute.snapshot.params['id'];

  constructor(private fb:FormBuilder,
    private incomeService:IncomeService,
    private activatedRoute:ActivatedRoute,
    private message:NzMessageService,
    private router:Router
  ) { }

  ngOnInit(){
    this.incomeForm = this.fb.group({
      title:[null, Validators.required],
      amount:[null, Validators.required],
      date:[null, Validators.required],
      category:[null, Validators.required],
      description:[null, Validators.required],
    });
    this.getIncomeById();
  }

  getIncomeById(){
    this.incomeService.getIncomeById(this.id).subscribe(res=>{
      this.incomeForm.patchValue(res);
    },error=>{
      this.message.error("Something Went Wrong",{nzDuration:5000});
    })
  }

  submitForm(){
    this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(res=>{
      this.message.success("Income updated successfully",{nzDuration:5000});
      this.router.navigateByUrl("/income");
    },error=>{
      this.message.error("Error while updating income",{nzDuration:5000});
    })
  }

}
