import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  registerForm(){
    this.router.navigate(['/register']);
  }
  loginForm(){
    this.router.navigate(['/login']);
  }
  surveyForm(){
    this.router.navigate(['/lang/customer-form']);
  }

}
