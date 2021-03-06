import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'password-comp',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent {
  public visibilityOldPassword: boolean = true;
  public visibilityNewPasswords: boolean = true;
  public visibilityFillPasswords: boolean = true;
  public visibilitySuccessMessage: boolean = true;
  public oldPassword: string = undefined;
  public newPassword1: string = undefined;
  public newPassword2: string = undefined;

  constructor (private configService: ConfigService) {
  }

  changePassword(){
    this.visibilityFillPasswords = true;
    this.visibilityNewPasswords = true;
    this.visibilityOldPassword = true;
    this.visibilitySuccessMessage = true;
    // checking for filling all fields
    if (this.oldPassword === undefined || this.newPassword1 === undefined || this.newPassword2 === undefined
      || this.oldPassword === '' || this.newPassword1 === '' || this.newPassword2 === ''){
      this.visibilityFillPasswords = false;
      // checking if password in old-password-input is equal to real current password
    } else if (this.oldPassword !== this.configService.currentUser['password']){
                this.visibilityOldPassword = false;
                // checking if two new passwords are equal
              } else if (this.newPassword1 !== this.newPassword2){
                        this.visibilityNewPasswords = false;
                        // put new password to service
                      } else {
                        this.visibilitySuccessMessage = false;
                        this.configService.currentUser['password'] = this.newPassword1;
                        this.configService.arrUsers.splice(this.configService.indexOfCurrentUser, 1, this.configService.currentUser);
                        this.configService.saveLocalUsers();
                      }
  }
}
