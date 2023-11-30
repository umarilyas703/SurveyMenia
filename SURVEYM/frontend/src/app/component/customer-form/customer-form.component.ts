import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  _id : string;
  title: string;
  age: string;
  gender: string;
  userId: string;
  surveyId: string;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSuccessfulLogin(){    

    

    
    const user = {
      id :this._id,
      name: this.title,
      age :this.age,
      gender :this.gender,
      surveyId :this.surveyId,
      
    }
    this.authService.authenticateUser(user).subscribe((data:any) => {
      //console.log(data);
      if(data['success']){           
        this.authService.storeEuserData(data.token, data.user); 
        this.userId = this.authService.getLoggedInUserId();       
        console.log("I am here please allow : " )
        if(data.user.role == 'ADMIN'){
          this.router.navigate(['/lang']);  
        } 
        else if(data.user.role == 'USER')
        {
          this.router.navigate(['/user']);
        }}
      });
    }

  addCustomer(title: string, age: string, gender: string, surveyId:string){
    this.onSuccessfulLogin()
    this.questionService.createCustomer(title, age, gender, surveyId)
      .subscribe((customer: any)=>{

        this.authService.storeEuserData(customer.token, customer._id); 
              
        console.log("I am here please allow : " + customer._id );
        this.router.navigate(['/user/'+customer._id]);
      //window.location.reload();
      
      alert("Customer Added Successfully")})
      
      localStorage.setItem('custName', title);
      
      


      //this.router.navigate(['/user/'+customer._id]);
  }

}

