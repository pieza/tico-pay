import { Injectable } from '@angular/core';

/**
 * Service to handle cookies.
 */
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  DEFAULT_DAYS_EXPIRATION = 1;

  constructor() { }

  /**
   * Creates a cookie on the browser.
   * 
   * @param name  name of the cookie.
   * @param value value of the cookie.
   * @param days  expiration days.
   */
  createCookie(name: String, value: any, days = this.DEFAULT_DAYS_EXPIRATION) {
    let expires;
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  /**
   * Get a cookie value in the browser.
   * 
   * @param name cookie name.
   */
  getCookie(name) {
    if (document.cookie.length > 0) {
      let cookieStart = document.cookie.indexOf(name + "=");
      if (cookieStart != -1) {
        cookieStart = cookieStart + name.length + 1;
        let cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        return unescape(document.cookie.substring(cookieStart, cookieEnd));
      }
    }
    return "";
  }
}
