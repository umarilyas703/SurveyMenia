import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import Customer from 'src/app/models/customer';
import Responses from 'src/app/models/responses';
import { QuestionsService } from 'src/app/services/questions.service';

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

  constructor(    
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.questionService.getCustomer()
      .subscribe((customers: any) => this.customers = customers);

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