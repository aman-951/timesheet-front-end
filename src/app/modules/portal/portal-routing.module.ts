import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ViewComponent } from './components/layout/view/view.component';

// candidate-components
import { CandidateViewComponent } from './components/candidates/candidate-view/candidate-view.component';
import { CandidateListComponent } from './components/candidates/candidate-list/candidate-list.component';
import { CandidateCreateComponent } from './components/candidates/candidate-create/candidate-create.component';

// user-components
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';

// role-components
import { RoleViewComponent } from './components/role/role-view/role-view.component';
import { RoleCreateComponent } from './components/role/role-create/role-create.component';
import { RoleListComponent } from './components/role/role-list/role-list.component';
import { UpdatePermissionsComponent } from './components/role/update-permissions/update-permissions.component';

// status components
import { StatusListComponent } from './components/status/status-list/status-list.component';
import { StatusCreateComponent } from './components/status/status-create/status-create.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { TimesheetMainComponent } from './components/timesheet/timesheet-main/timesheet-main.component';
import { TimesheetApproveComponent } from './components/timesheet/timesheet-approve/timesheet-approve.component';
import { DailystatusComponent } from './components/dailystatus/dailystatus.component';
import { DailystatusMainComponent } from './components/dailystatus/dailystatus-main/dailystatus-main.component';
import { DailystatusApproveComponent } from './components/dailystatus/dailystatus-approve/dailystatus-approve.component';
import { DailystatusAssignTaskComponent } from './components/dailystatus/dailystatus-assignTask/dailystatus-assignTask.component';
import { AssignEmployeesComponent } from './components/tasks/assign-employees/assign-employees.component';
import { TaskMainComponent } from './components/tasks/task-main/task-main.component';
import { AddTasksComponent } from './components/tasks/add-tasks/add-tasks.component';
import { AssignTasksComponent } from './components/tasks/assign-tasks/assign-tasks.component';


const routes: Routes = [{
  path: '',
  component: ViewComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'candidates',
    component: CandidateListComponent
  }, {
    path: 'candidates/new',
    component: CandidateCreateComponent
  }, {
    path: 'candidates/:id',
    component: CandidateViewComponent
  }, {
    path: 'candidates/:id/modify',
    component: CandidateCreateComponent
  }, {
    path: 'users',
    component: UserListComponent
  }, {
    path: 'users/new',
    component: UserCreateComponent
  },  {
    path: 'users/:id',
    component: UserViewComponent
  }, {
    path: 'roles',
    component: RoleListComponent
  }, {
    path: 'roles/new',
    component: RoleCreateComponent
  }, {
    path: 'roles/:id',
    component: RoleViewComponent
  }, {
    path: 'roles/:id/modify',
    component: RoleCreateComponent
  }, {
    path: 'roles/:id/permissions',
    component: UpdatePermissionsComponent
  }, {
    path: 'application-statuses',
    component: StatusListComponent
  }, {
    path: 'application-statuses/new',
    component: StatusCreateComponent
  },
{
    path: 'timesheetMain',
    component: TimesheetMainComponent
  }, {
    path: 'timesheet/:empId',
    component: TimesheetComponent
  }, {
    path: 'approveTimesheet',
    component: TimesheetApproveComponent
  }, {
    path: 'dailyStatusMain',
    component: DailystatusMainComponent
  }, {
    path: 'dailyStatus/:empId',
    component: DailystatusComponent
  }, {
    path: 'approveDailyStatus',
    component: DailystatusApproveComponent
  }, {
    path: 'assignTask',
    component: DailystatusAssignTaskComponent 
  }, {
    path: 'assignEmployees',
    component: AssignEmployeesComponent
  }, {
    path: 'taskMain',
    component: TaskMainComponent 
  },
 {
    path: 'addTasks',
    component: AddTasksComponent  
  }, {
    path: 'assignTaskToEmployees',
    component: AssignTasksComponent 
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
