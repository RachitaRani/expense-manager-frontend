import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { UpdateExpensesComponent } from './components/update-expenses/update-expenses.component';
import { IncomeComponent } from './components/income/income.component';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:"", component: DashboardComponent, pathMatch: 'full'},
  {path:"expenses", component: ExpensesComponent},
  {path:"income", component: IncomeComponent},
  {path:"expenses/:id/edit", component: UpdateExpensesComponent},
  {path:"income/:id/edit", component: UpdateIncomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
