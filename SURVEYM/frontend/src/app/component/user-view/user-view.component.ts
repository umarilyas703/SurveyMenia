import { Component, OnInit } from '@angular/core';
import Language from 'src/app/models/language';
import Category from 'src/app/models/category';
import Question from 'src/app/models/question';
import Customer from 'src/app/models/customer';
import Responses from 'src/app/models/responses';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  languages: Language[] = [];
  currentLanguage: Language;  
  categories: Category[] = [];
  selectedCategories: String[] = [];
  newCategories: Category[] = [];
  questions: Question[] = [];
  languageId: string;
  categoryId: string;
  categoryIndex: number=0;
  questionIndex: number=0;
  nextButtonCheck: boolean=false;
  userResponse: any;
  responseArray: any=[];
  surveySubmitted: boolean = false;
  catSelector: boolean = false;
  hideLanguage: boolean = false;
  customerName: string;
  customerAge: string;
  customerGender: string;
  customers: Customer[] = [];
  currentCustomer: string;
  currentClientId: string;
  customerId: string;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {

    this.questionService.getCustomer()
      .subscribe((customers: any) => this.customers = customers);

    this.questionService.getLanguage()
      .subscribe((languages: any) => {
        this.languages = languages;
      });

    this.route.params.subscribe((params: any) => { 
        if(params.languageId){
          this.languageId = params.languageId;
        }
        

        this.customerId = params.customerId;
        if(!this.customerId) return;
      
        if(this.customerId){
            this.questionService.getOneCustomerTitle(this.customerId)
            .subscribe((currentcustomer: any) => {
                this.currentCustomer = currentcustomer.title;
                this.currentClientId = currentcustomer.clientId;
            });
        }
    
        if(this.languageId){
            this.questionService.getOneLanguageTitle(this.languageId)
            .subscribe((currentLanguage: any) => {
                this.currentLanguage = currentLanguage;
        })};

        console.log(this.newCategories);
        this.questionService.getCategory(this.languageId)
            .subscribe((categories: any) =>{ this.categories = categories});
    });

  };
    
    getQuestion(categoryId: string){
      console.log(categoryId);
      this.categoryId = categoryId;
      if(!this.categoryId) return;
      this.questionService.getQuestionByCat(this.categoryId).subscribe((questions: any) => {this.questions = questions
      });

    };

    nextQuestion(){
      let x = this.questions.length-1;
      if(x==this.questionIndex){
        this.questions = [];
        this.questionIndex = 0;
        if(this.newCategories[this.categoryIndex+1]){
          this.getQuestion(this.newCategories[this.categoryIndex+1]._id);
          this.categoryIndex = this.categoryIndex+1;
        }
        
      }else{
        this.questionIndex = this.questionIndex+1;
      }
      this.nextButtonCheck = false;
      this.userResponse=null;
    }

    checkSubmissions(){
      let x = this.questions.length-1;
      let y = this.newCategories.length-1;
      if(x==this.questionIndex && y==this.categoryIndex){
        return true;
      }
      return false;
    }

    submitAnswer(event: any){
    
      let tempVar: any = this.questions[this.questionIndex]._domainId;
      let domainTitle: string;
      (this.questionService.getOneDomain(tempVar).subscribe((c:any)=>{
        domainTitle=c.title
        this.responseArray.push({
          "customerName":this.customerName,
          "customerAge":this.customerAge,
          "customerGender":this.customerGender,
            "customerId":this.customerId,
            "category":this.newCategories[this.categoryIndex].title, 
            "categoryId": this.categoryId,
            "domain":domainTitle,
            "domainId": tempVar,
            "question":this.questions[this.questionIndex].title,
            "response":event
          });
        
        let currentDate = new Date().toLocaleDateString('en-AU',);

        this.questionService.createResponse(this.currentCustomer, this.currentClientId, this.customerId, this.newCategories[this.categoryIndex].title, this.categoryId, domainTitle, tempVar, this.questions[this.questionIndex].title, event, currentDate).subscribe(()=>console.log("Response Saved"))
      }));
        
      this.nextButtonCheck = true;
    }

    sendResponses(){
      this.surveySubmitted = true;
      console.log(this.responseArray);
    }

    redirectHome(){
      if(confirm("Are you sure you want to leave current survey session?")){
        this.router.navigate(['/user/'])
      }
    }

    categoriesSelected(){
      if(this.selectedCategories.length==0){
        alert("Please select categories to proceed, thank you");
        return
      }

      for(let i=0; i<this.selectedCategories.length; i++){
        for(let j=0; j<this.categories.length; j++){
          if(this.selectedCategories[i]===this.categories[j]._id){
            this.newCategories.push(this.categories[j]);
          }
        }
      }

      this.getQuestion(this.newCategories[this.categoryIndex]._id);

      console.log(this.newCategories+" SECOND CHECK");

      this.catSelector=true;
      this.hideLanguage=true;
    }

    onCatSelectChange($event: any){
      const id = $event.target.value;
      const isChecked = $event.target.checked;
      if(isChecked){
        this.selectedCategories.push(id);
      }else if(this.selectedCategories.length>0){
        let deleteItem = id;
        for (let i = this.selectedCategories.length-1; i >= 0; i--) {
          if (this.selectedCategories[i] === deleteItem) {
            this.selectedCategories.splice(i, 1);
          }
        }
      }

      console.log(this.selectedCategories);

    }

    
  onLogout(){
        this.authService.logout();
        alert("You are now logged out");
        this.router.navigate(['/login']);
        return;
      }

}




