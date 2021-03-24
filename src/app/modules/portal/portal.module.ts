import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { PortalRoutingModule } from './portal-routing.module';

// components
import { DashboardComponent } from './components/dashboard/dashboard.component';

// lauout-components
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
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
import { UtilityModule } from '../utility/utility.module';

// status components
import { StatusListComponent } from './components/status/status-list/status-list.component';
import { StatusCreateComponent } from './components/status/status-create/status-create.component';
import { UpdateApplicationStatusComponent } from './components/candidates/update-application-status/update-application-status.component';
import { ShareCandidateComponent } from './components/candidates/share-candidate/share-candidate.component';
import { StatusLogComponent } from './components/candidates/status-log/status-log.component';
import { ChangeRoleComponent } from './components/user/change-role/change-role.component';
import { ListPermissionsComponent } from './components/role/list-permissions/list-permissions.component';
import { UpdatePermissionsComponent } from './components/role/update-permissions/update-permissions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
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
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent, HeaderComponent,
    FooterComponent, SidebarComponent,
    ViewComponent, CandidateViewComponent,
    CandidateListComponent, CandidateCreateComponent,
    UserCreateComponent, UserListComponent,
    UserViewComponent, RoleViewComponent,
    RoleCreateComponent, RoleListComponent,
    StatusListComponent, StatusCreateComponent,
    UpdateApplicationStatusComponent, ShareCandidateComponent,
    StatusLogComponent, ChangeRoleComponent, ListPermissionsComponent, 
    UpdatePermissionsComponent, ProfileComponent, TimesheetComponent, TimesheetMainComponent, 
    TimesheetApproveComponent, DailystatusComponent,DailystatusMainComponent,DailystatusApproveComponent,DailystatusAssignTaskComponent,
    AssignEmployeesComponent, TaskMainComponent, AddTasksComponent, AssignTasksComponent
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    PortalRoutingModule,
    UtilityModule,ReactiveFormsModule,MatTableModule,FormsModule
  ]
})
export class PortalModule { }
