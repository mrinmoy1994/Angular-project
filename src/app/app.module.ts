import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GeneralHomeComponent } from './generalHome.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { CountdownModule } from 'ng2-date-countdown';
import { ChooseCaptainComponent } from './choose-captain/choose-captain.component';
import { ShowTeamsComponent } from './show-teams/show-teams.component';
import { FooterComponent } from './common/footer/footer.component';
import { PreviewComponent } from './preview/preview.component';
import { ButtonComponent } from './common/button/button.component';
import { SelectContestComponent } from './select-contest/select-contest.component';
import { OpenContestComponent } from './open-contest/open-contest.component';
import { breakupModalComponent } from './breakup-modal/breakup-modal.component';
import { ParticipantsComponent } from './participants/participants.component';
import { JoinComponent } from './join/join.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    CountdownModule,
    ProgressBarModule,
  ],
  entryComponents: [breakupModalComponent],
  declarations: [
    AppComponent,
    HelloComponent,
    HomeComponent,
    LoginComponent,
    GeneralHomeComponent,
    CreateTeamComponent,
    ChooseCaptainComponent,
    ShowTeamsComponent,
    FooterComponent,
    PreviewComponent,
    ButtonComponent,
    SelectContestComponent,
    OpenContestComponent,
    breakupModalComponent,
    ParticipantsComponent,
    JoinComponent,
    HeaderComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
