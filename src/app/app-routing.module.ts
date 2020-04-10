import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralHomeComponent } from './generalHome.component';
import { HomeComponent } from './home/home.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ChooseCaptainComponent } from './choose-captain/choose-captain.component';


const routes: Routes = [
  { path: 'generalHome', component: GeneralHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hello', component: HelloComponent },
  { path: 'login', component : LoginComponent},
  { path: 'createTeam', component : CreateTeamComponent},
  { path: 'chooseCaptain', component : ChooseCaptainComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }