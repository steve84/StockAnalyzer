import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'translateMessage'
})
export class MessageTranslationPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: number, locale?: string): string {
    if (value && (locale || this.locale)) {
      switch (locale || this.locale) {
        case 'de':
          return this.getTranslationDE(value);
        default:
          return this.getTranslationEN(value);
      }
    }
  }

  getTranslationDE(value: number) {
    switch (value) {
      case 1:
        return 'Benutzername fehlt';
      case 2:
        return 'Mail-Address fehlt';
      case 3:
        return 'Passwort fehlt oder ist zu kurz';
      case 4:
        return 'Passwort wiederholen';
      case 5:
        return 'Passwörter sind nicht identisch';
      case 6:
        return 'Konto erfolgreich bestätigt';
      case 7:
        return 'Konto konnte nicht aktiviert werden';
      case 8:
        return 'Benutzername oder Passwort nicht korrekt';
      case 9:
        return 'Passwort erfolgreich zurückgesetzt';
      case 10:
        return 'Passwort konnte nicht zurückgesetzt werden';
      case 11:
        return 'Passwort erfolgreich geändert';
      case 12:
        return 'Passwort konnte nicht geändert werden';
      case 13:
        return 'Captcha ungültig';
      case 14:
        return 'Benutzer erfolgreich registiert';
      case 15:
        return 'Fehler während der Registierung';
      case 16:
        return 'Benutzername wird bereits verwendet';
      case 17:
        return '';
      case 18:
        return 'Die Summe der Faktoren muss 100 betragen (aktuell: ';
      case 19:
        return '';
      case 20:
        return '';
    }
  }

  getTranslationEN(value: number) {
    switch (value) {
      case 1:
        return 'Username is missing';
      case 2:
        return 'Mail-Address is missing';
      case 3:
        return 'Password missing or to short';
      case 4:
        return 'Repeat password';
      case 5:
        return 'Passwords not equal';
      case 6:
        return 'Account confirmed successfully';
      case 7:
        return 'Cannot confirm account';
      case 8:
        return 'Username or password not correct';
      case 9:
        return 'Passwort reset successfully';
      case 10:
        return 'Cannot reset password';
      case 11:
        return 'Passwort changed successfully';
      case 12:
        return 'Cannot change password';
      case 13:
        return 'Captcha not valid';
      case 14:
        return 'User registered successfully';
      case 15:
        return 'Error during user registration';
      case 16:
        return 'Username already in use';
      case 17:
        return '';
      case 18:
        return 'The sum of the factors has to be 100 (actual: ';
      case 19:
        return '';
      case 20:
        return '';
    }
  }
}