import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import Category from 'src/app/models/category';
import Question from 'src/app/models/question';
import { TaskService } from 'src/app/task.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  categories: Category[] = [];
  questions: Question[] = [];

  constructor(
    private questionService: TaskService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.questionService.getCategory()
      .subscribe((categories: any) => this.categories = categories);

    
      this.route.params.subscribe((params: Params) => {
        const categoryId = params['categoryId'];
        if (!categoryId) return;
        this.questionService.getQuestion(categoryId).subscribe((questions: any) => this.questions = questions)
      })
  }

  

  

}
