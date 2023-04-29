const getFirebaseProcessedError = (code: string) => {
    code = code.replace('auth/', '');
    var _m = "";
    switch (code) {
      case "email-already-in-use":
        _m = "Email is already in use. Please try signing in.";
        break;
      case "invalid-email":
        _m = "Email is invalid, please try again.";
        break;
      case "user-disabled":
        _m =
          "This account is currently suspended. Please reach out to us for details.";
        break;
      case "user-not-found":
        _m = "No user found!";
        break;
      case "wrong-password":
        _m = "The password you entered is wrong. Please try again.";
        break;
  
      case "weak-password:":
        _m = "Password too weak. Please try with a stronger password.";
        break;
      case "auth/invalid-email":
        _m = "Email is invalid";
        break;
  
      case "auth/user-not-found":
        _m = "No user found!";
        break;
      case "expired-action-code":
      case "session-expired":
        _m = "OTP expired. Please press resend button!";
        break;
  
      case "invalid-verification-code":
        _m =
          "You entered an invalid code. Please enter the correct OTP to proceed!";
        break;
      case "popup":
        _m =
          "You entered an invalid code. Please enter the correct OTP to proceed!";
        break;
      case "missing-client-identifier":
      case "operation-not-allowed":
      case "invalid-verification-id":
      case "invalid-custom-token":
      case "auth/missing-android-pkg-name":
      case "auth/missing-continue-uri":
      case "auth/unauthorized-continue-uri":
      case "invalid-action-code":
      case "custom-token-mismatch":
      default:
        _m =
          "Something went wrong. Please restart the app, check your internet or contact us if the issue persists.";
    }
    return _m;
  };
  
  export default getFirebaseProcessedError