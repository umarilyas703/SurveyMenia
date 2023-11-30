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
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  languageId: string;
  userName : string;
  userId: string;
  

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { 
      this.route.params.subscribe((params: any)=> this.languageId = params.languageId);
    }

  ngOnInit(): void {
    this.userName = this.authService.getLoggedInUserName();
    //console.log("This is the Name from Category : " + this.authService.getLoggedInUserName)
    this.userId = this.authService.getLoggedInUserId();
    this.userName = this.authService.getLoggedInUserName();
    console.log("This is the user ID : " + this.userId );
    console.log("this is the user name : " + this.userName)


  }

  addCategory(name: string, surveyDescription:string){
    console.log("This is the Name from Category : " + this.userId);
    
    console.log("this is the value of surveyDescription: " + surveyDescription);
    this.questionService.createCategory(this.languageId, name, surveyDescription, this.userId)
      .subscribe(()=>this.router.navigate(['../'], {relativeTo: this.route}))
  }

}
