import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExternalProvidersService implements OnInit {
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  googleClient = environment.providersKeys.google.clientId
  auth2: any;
  googleProfile!: any
  private extAuthChangeSub = new Subject<SocialUser>()

  constructor(private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
      this.extAuthChangeSub.next(user)
    })
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }
  //***********facebook provider***************//
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }


  //***********google provider************* */
  signInWithGoogle = () => {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
