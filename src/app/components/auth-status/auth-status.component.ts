import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';
import { LoginModel } from 'src/app/models/login-model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.css'],
})
export class AuthStatusComponent implements OnInit {
  public loginModel: LoginModel;

  @ViewChild('content')
  private content: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private authService: AuthServiceService
  ) {
    this.loginModel = new LoginModel();
  }

  ngOnInit(): void {}
  logIn() {
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(() => {
        // console.log('modal closed');
        // console.log(this.loginModel);
        this.authService.autenticate(this.loginModel);
      });
  }
}
