import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  domainId: string;
  categoryId: string;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe((params: any)=> {
        this.domainId = params.domainId;
        this.categoryId = params.categoryId;
      });
    }

  ngOnInit(): void {
  }

  addQuestion(value: string){
    console.log(this.domainId + " Domain Id");
    this.questionService.createQuestion(this.categoryId, this.domainId, value)
      .subscribe(()=>this.router.navigate(['../'], {relativeTo: this.route}));
  }

}
