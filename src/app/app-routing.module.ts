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


const routes: Routes = [
  { path: 'generalHome', component: GeneralHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hello', component: HelloComponent },
  { path: 'login', component : LoginComponent},
  { path: 'createTeam', component : CreateTeamComponent},
  { path: 'chooseCaptain', component : ChooseCaptainComponent},
  { path: 'showTeam', component : ShowTeamsComponent},
  { path: 'preview', component : PreviewComponent},
  { path: 'selectContest', component : SelectContestComponent},
  { path: 'openContest', component : OpenContestComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }