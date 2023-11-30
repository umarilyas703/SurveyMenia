import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import Customer from 'src/app/models/customer';
import Responses from 'src/app/models/responses';
import Language from 'src/app/models/language';
import Category from 'src/app/models/category';
import { QuestionsService } from 'src/app/services/questions.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {

  customers: Customer[] = [];
  responses: Responses[] = [];
  currentCustomer: string;
  customerId: string;
  categories: Category[] = [];
  userId: string;
  currentUser: string;
  languageId: string;

  constructor(    
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

    this.userId = this.authService.getLoggedInUserId();
    console.log("this is the user id i am getting : " + this.userId);

    this.languageId = "634d072d9bbb95c30c7b183c";

    this.questionService.getCustomer()
      .subscribe((customers: any) => this.customers = customers);
    
    this.questionService.getCategory(this.userId)
        .subscribe((categories: any) => {
          this.categories = categories

          console.log("this is the category from this class : " + categories.title);
          
        });

      

    this.route.params.subscribe((params: any) => {

      this.customerId = params.customerId;
      if(!this.customerId) return;
      
      if(this.customerId){
        this.questionService.getOneCustomerTitle(this.customerId)
          .subscribe((currentcustomer: any) => {
            this.currentCustomer = currentcustomer.title;
        });
      }

      this.questionService.getResponsesOfCustomer(this.customerId)
        .subscribe((responses: any) => {
          this.responses = responses;
        })
    });
  }

  redirectHome(){
    this.router.navigate(['/lang/'])
  }

}