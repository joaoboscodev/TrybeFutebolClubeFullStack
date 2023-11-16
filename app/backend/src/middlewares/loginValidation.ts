class loginValidation {
  static async isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static async isPasswordValid(password: string) {
    if (password.length < 6) {
      return false;
    }
    return true;
  }
}

export default loginValidation;
