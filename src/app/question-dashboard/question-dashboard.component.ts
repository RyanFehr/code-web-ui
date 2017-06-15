import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question/question.service';
import { Question } from '../domains/question';


@Component({
  selector: 'app-question-dashboard',
  templateUrl: './question-dashboard.component.html',
  styleUrls: ['./question-dashboard.component.css']
})
export class QuestionDashboardComponent implements OnInit {

  questions: Question[];

  constructor(private questionService: QuestionService, private router: Router) {

   }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe(
      questions => this.questions = questions,
      error => {
        console.error('An error occurred in the question component', error);
      }
    );
  }

  goToAddQuestion(): void {
    this.router.navigate(['/question/new']);
  }

}
