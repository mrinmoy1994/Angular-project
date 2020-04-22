import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralHomeComponent } from './generalHome.component';
import { HomeComponent } from './home/home.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ChooseCaptainComponent } from './choose-captain/choose-captain.component';
import { ShowTeamsComponent} from './show-teams/show-teams.component';
import { PreviewComponent } from './preview/preview.component';
import { SelectContestComponent } from './select-contest/select-contest.component';
import { OpenContestComponent} from './open-contest/open-contest.component';
import { ParticipantsComponent} from './participants/participants.component';
import { JoinComponent} from './join/join.component';
import { AuthenticateGuard } from './authenticate.guard';


const routes: Routes = [
  
  { path: 'generalHome', component: GeneralHomeComponent, canActivate: [AuthenticateGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthenticateGuard]},
  { path: 'hello', component: HelloComponent, canActivate: [AuthenticateGuard]},
  { path: 'login', component : LoginComponent},
  { path: 'createTeam', component : CreateTeamComponent, canActivate: [AuthenticateGuard]},
  { path: 'chooseCaptain', component : ChooseCaptainComponent, canActivate: [AuthenticateGuard]},
  { path: 'showTeam', component : ShowTeamsComponent, canActivate: [AuthenticateGuard]},
  { path: 'preview', component : PreviewComponent, canActivate: [AuthenticateGuard]},
  { path: 'selectContest', component : SelectContestComponent, canActivate: [AuthenticateGuard]},
  { path: 'openContest', component : OpenContestComponent, canActivate: [AuthenticateGuard]},
  { path: 'participants', component : ParticipantsComponent, canActivate: [AuthenticateGuard]},
  { path: 'join', component : JoinComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }