import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private webService: WebService) { }

  onSuccessfulLogin(username: string ){
    
  }

  getLanguage(){
    return this.webService.get('language')
  }

  getOneLanguageTitle(languageId: string){
    return this.webService.get(`language/${languageId}`)
  }

  getCategory(languageId: string){
    return this.webService.get(`${languageId}/category`)
  }

  createCategory(languageId: string, title: string){
    return this.webService.post(`${languageId}/category`, {title});
  }

  deleteCategory(categoryId: string){
    return this.webService.delete(`category/${categoryId}`);
  } 

  getQuestion(domainId: string){
    return this.webService.get(`domains/${domainId}/questions`);
  }

  getQuestionByCat(categoryId: string){
    return this.webService.get(`category/${categoryId}/questions`);
  }

  createQuestion(categoryId: string, domainId: string, title: string){
    return this.webService.post(`category/${categoryId}/domains/${domainId}/questions`, {title});
  }

  deleteQuestion(questionId: string){
    return this.webService.delete(`questions/${questionId}/`);
  } 

  getDomain(categoryId: string){
    return this.webService.get(`category/${categoryId}/domains`);
  }

  getOneDomain(domainId: string){
    return this.webService.get(`domains/${domainId}`);
  }

  createDomain(categoryId: string, title: string){
    return this.webService.post(`category/${categoryId}/domains`, {title});
  }

  deleteDomain(domainId: string){
    return this.webService.delete(`domains/${domainId}/`);
  } 

  createCustomer(title: string, clientId: string){
    return this.webService.post(`customer`, {title, clientId});
  }

  createLanguage(title: string, sagree: string, agree: string, neutral: string, dagree: string, sdagree: string){
    return this.webService.post(`language`, {title, sagree, agree, neutral, dagree, sdagree});
  }

  getCustomer(){
    return this.webService.get('customer')
  }

  getOneCustomerTitle(customerId: string){
    return this.webService.get(`customer/${customerId}`)
  }

  createResponse(customerName: string, clientId: string, customerId: string, categoryName: string, _categoryId: string, domainName: string, _domainId: string, question: string, response: string, date: string){
    return this.webService.post(`add-response/${customerId}`, {customerName, clientId, categoryName, domainName, question, response, date, _categoryId, _domainId});
  }

  getResponsesOfCustomer(customerId: string){
    return this.webService.get(`response/${customerId}/responses`);
  }

}
