import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilityService } from 'app/shared/utility/utility.service';
import { QuestionService } from 'app/shared/services/question.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.scss']
})
export class QuestionsDetailComponent implements OnInit, OnDestroy {

  relationid: any;
  questionList: any = [];
  askedquestion: any = [];
  answerList: any = [];

  offsetPayload = {
    limit: 3,
    offset: 0,
  };

  private _unsubscribe = new Subject<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private QuestionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.relationid = params.get("id");
      this.questionDetail(this.relationid, this.offsetPayload);
    })
  }

  questionDetail(relationid, offsetPayload) {
    // this.utilityService.loaderStart();
    this.QuestionService.questionDetail(relationid, offsetPayload).subscribe(
      (success: any) => {
        this.questionList = success.data;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  showMoreCards() {
    this.offsetPayload.offset = this.offsetPayload.offset + this.offsetPayload.limit;
    this.QuestionService.questionDetail(this.relationid, this.offsetPayload).subscribe(
      (success: any) => {
        this.questionList.askedquestion.push(...success.data.askedquestion);
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

}
