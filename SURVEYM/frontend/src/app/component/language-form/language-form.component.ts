import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addLanguage(title: string, sagree: string, agree: string, neutral: string, dagree: string, sdagree: string){
    this.questionService.createLanguage(title, sagree, agree, neutral, dagree, sdagree)
      .subscribe((customer: any)=>{
      window.location.reload();
      alert("Language Added Successfully")})
  }

}
