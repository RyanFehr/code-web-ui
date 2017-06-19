import { UserService } from './services/user/user.service';
import { AssessmentService } from './services/assessment/assessment.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdListModule, MdToolbarModule,
   MdGridListModule, MdInputModule, MdSnackBarModule, MdDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDashboardComponent } from './question-dashboard/question-dashboard.component';
import { QuestionListItemComponent } from './question-list-item/question-list-item.component';
import { QuestionService } from './services/question/question.service';
import { AlertService } from './services/alert/alert.service';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { AlertComponent } from './alert/alert.component';
import { DialogComponent } from './alert/dialog/dialog.component';
import { RegisterComponent } from './register/register/register.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { NewAssessmentDialogComponent } from './new-assessment-dialog/new-assessment-dialog.component';
import { ActivateComponent } from './register/activate/activate.component';


@NgModule({
  declarations: [
    AppComponent,
    AssessmentListComponent,
    NewAssessmentDialogComponent,
    QuestionDashboardComponent,
    QuestionListItemComponent,
    QuestionDetailsComponent,
    AlertComponent,
    DialogComponent,
    RegisterComponent,
    ActivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
    MdGridListModule,
    MdInputModule,
    MdSnackBarModule,
    MdDialogModule,
  ],
  entryComponents: [
    DialogComponent,
    AlertComponent,
    NewAssessmentDialogComponent
  ],
  providers: [AlertService,
    QuestionService,
    AssessmentService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
