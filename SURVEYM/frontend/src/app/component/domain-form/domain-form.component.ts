import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss']
})
export class DomainFormComponent implements OnInit {

  categoryId: string;  

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe((params: any)=> this.categoryId = params.categoryId);      
    }

  ngOnInit(): void {
  }

  addDomain(value: string){
    this.questionService.createDomain(this.categoryId, value)
      .subscribe(()=>this.router.navigate(['../'], {relativeTo: this.route}));
  }

  cancel(){
    this.router.navigate(['/lang'])
  }

}
