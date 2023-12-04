import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import Language from 'src/app/models/language';
import Category from 'src/app/models/category';
import Question from 'src/app/models/question';
import Domain from 'src/app/models/domain';
import { QuestionsService } from 'src/app/services/questions.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-questions-view',
  templateUrl: './questions-view.component.html',
  styleUrls: ['./questions-view.component.scss']
})
export class QuestionsViewComponent implements OnInit {
  languages: Language[] = [];
  currentLanguage: string;
  categories: Category[] = [];
  questions: Question[] = [];
  domains: Domain[] = [];
  currentUser: string;
  languageId: string;
  categoryId: string;
  domainId: string;
  tempCategoryIdHolder: string;
  user: Object;
  userId: string;
  userName: string;
  engId: string;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    
    ) { }

  ngOnInit() {

    this.userId = this.authService.getLoggedInUserId();
    this.userName = this.authService.getLoggedInUserName();
    console.log("This is the user ID : " + this.userId );
    console.log("this is the user name : " + this.userName)


    this.authService.getProfile().subscribe({
      next: (profile) => {        
        this.user = profile;
        console.log('user profile'+profile.toString)
      },        
      error: (err) => {
        console.log(err);
        return false;
      }
    })  

    this.questionService.getCustomer().subscribe({

    })
  
    this.questionService.getLanguage()
      .subscribe((languages: any) => this.languages = languages);

    this.route.params.subscribe((params: any) => {

      this.languageId = params.languageId;
      this.engId = '634d072d9bbb95c30c7b183c';

      this.categoryId = params.categoryId;
      this.domainId = params.domainId;
      if(!this.languageId && !this.categoryId && !this.domainId) return;
      
      if(this.languageId ){
        this.questionService.getOneLanguageTitle(this.languageId)
          .subscribe((currentLanguage: any) => {
            this.currentLanguage = currentLanguage.title;
        });
          
        this.questionService.getCategory(this.userId)
          .subscribe((categories: any) => this.categories = categories);
          console.log("String : " + this.categories);
      } 
      if(this.categoryId) {
        this.questionService.getDomain(this.categoryId)
          .subscribe((domains: any) => this.domains = domains);
      } 
      if(this.domainId) {
        this.questionService.getQuestion(this.domainId)
          .subscribe((questions: any) => this.questions = questions);
      }
    });
  }
  

  deleteDomain(domain: Domain) {
    if(confirm("Are you sure you want to delete selected domain?")){
      this.questionService.deleteDomain(domain._id)
        .subscribe((domain: any) => this.domains = this.domains.filter(d => d._id != domain._id))
      this.router.navigate(['/lang/'+this.languageId]);
      alert("Domain deleted successfully!");
    }
  };

  deleteQuestion(question: Question) { 
    if(confirm("Are you sure you want to delete selected question?")){
      this.questionService.deleteQuestion(question._id)
        .subscribe((question: any)=> this.questions = this.questions.filter(q => q._id != question._id)) 
      alert("Question deleted successfully!");
    }
  };

  deleteCategory(category: Category) {
    if(confirm("Are you sure you want to delete selected category?")){
      this.questionService.deleteCategory(category._id).subscribe(()=> this.categories = this.categories.filter(c => c._id != category._id));
      this.router.navigate(['/lang/'+this.languageId]);
      alert("Category deleted successfully!");
    }
    
  };

  addNewSurvey(){
    if(!this.languageId){
      alert("Please select a Language to add a question");
      return;
    }
    this.router.navigate([`/lang/${this.languageId}/category-form`]);
  }


  addNewQuestion(){
    //if(!this.domainId){
      //alert("Please select a Domain to add a question");
      //return;
    //}
    this.router.navigate(['./question-form'], {relativeTo: this.route });
  }

  addNewDomain(){
    if(!this.categoryId){
      alert("Please select a Category to add a domain");
      return;
    }
    this.router.navigate([`/lang/${this.languageId}/category/${this.categoryId}/domain-form`]);
  }

  addNewCustomer(){
    this.router.navigate(['/lang/customer-form'])
  }

  addNewLanguage(){
    this.router.navigate(['/lang/language-form'])
  }

  viewCustomer(){
    this.router.navigate(['/lang/customers'])
  }

  manageCustomer(){
    this.router.navigate(['/lang/manage-customers'])
  }

 

  onLogout(){
    this.authService.logout();
    alert("You are now logged out");
    this.router.navigate(['/login']);
    return;
  }

  onRegister(){
    this.router.navigate(['/register']);
    return;
  }

}
