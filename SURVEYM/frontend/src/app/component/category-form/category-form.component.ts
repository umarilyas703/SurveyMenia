// import { Component, OnInit } from '@angular/core';
// import { QuestionsService } from 'src/app/services/questions.service';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// @Component({
//   selector: 'app-category-form',
//   templateUrl: './category-form.component.html',
//   styleUrls: ['./category-form.component.scss']
// })
// export class CategoryFormComponent implements OnInit {

//   constructor(
//     private questionService: QuestionsService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//   }

//   addCategory(value: string){
//     this.questionService.createCategory(value)
//       .subscribe((category: any)=>this.router.navigate(['/category', category._id]))
//   }

// }

import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  languageId: string;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe((params: any)=> this.languageId = params.languageId);
    }

  ngOnInit(): void {
  }

  addCategory(value: string){
    this.questionService.createCategory(this.languageId, value)
      .subscribe(()=>this.router.navigate(['../'], {relativeTo: this.route}))
  }

}
