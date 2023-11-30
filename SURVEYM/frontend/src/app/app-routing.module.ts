import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { DomainFormComponent } from './component/domain-form/domain-form.component';
import { QuestionFormComponent } from './component/question-form/question-form.component';
import { QuestionsViewComponent } from './component/questions-view/questions-view.component';
import { UserViewComponent } from './component/user-view/user-view.component';
import { CustomerFormComponent } from './component/customer-form/customer-form.component';
import { CustomerViewComponent } from './component/customer-view/customer-view.component';
import { RegisterComponent } from './component/register/register.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { ValidateService } from './services/validate.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import{ MatInputModule} from '@angular/material/input';
import{ MatCardModule } from '@angular/material/card';
import { CanActivate } from '@angular/router';
import { LanguageFormComponent } from './component/language-form/language-form.component';

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'lang', component: QuestionsViewComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/language-form', component: LanguageFormComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/customer-form', component: CustomerFormComponent},
  { path: 'lang/customers', component: CustomerViewComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/customers/:customerId', component: CustomerViewComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/:languageId', component: QuestionsViewComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/:languageId/category/:categoryId', component: QuestionsViewComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/:languageId/category/:categoryId/domains/:domainId', component: QuestionsViewComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/:languageId/category-form', component: CategoryFormComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/:languageId/category/:categoryId/domains/:domainId/question-form', component: QuestionFormComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'lang/:languageId/category/:categoryId/domain-form', component: DomainFormComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'user', component: UserViewComponent},
  { path: 'user/:customerId', component: UserViewComponent},
  { path: 'user/:customerId/:languageId', component: UserViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatFormFieldModule,
    MatInputModule, MatCardModule],
  exports: [RouterModule, MatFormFieldModule,
    MatInputModule, MatCardModule]
    
})
export class AppRoutingModule { }
