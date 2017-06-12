import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { QuestionListItemComponent } from './question-list-item.component';
import { MaterialModule } from '@angular/material';
import { Question } from '../question';

describe('QuestionListItemComponent', () => {
  let question = 
       {
           "id": "id1",
           "title": "Title1",
           "body": "Body1",
           "suggestedAnswer": "SuggestedAnswer1",
           "difficulty": "5",
           "createdBy": "createdBy1",
           "createdDate" : new Date(),
           "modifiedBy": "modifiedBy1",
           "modifiedDate": new Date()
        };
  let mockRouter = {navigate: jasmine.createSpy('navigate')};
  let component: QuestionListItemComponent;
  let fixture: ComponentFixture<QuestionListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule, 
        RouterTestingModule, 
        MaterialModule, 
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListItemComponent);
    component = fixture.componentInstance;
  });

   it('should create', inject([Router],
    (router) => {
      expect(component).toBeTruthy();
    }));

    it('should populate the question details in the DOM', inject([Router],
    (router) => {
      component.question = question;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('md-card-title').textContent).toContain(question.title);
      expect(compiled.querySelector('#modificationSubtitle').textContent).toContain('Modified by ' + question.modifiedBy +' on ' + question.modifiedDate);
      expect(compiled.querySelector('#difficultySubtitle').textContent).toContain('Difficulty: ' + question.difficulty);
    }))
});
