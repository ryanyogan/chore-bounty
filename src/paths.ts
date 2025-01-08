export const homePath = "/";

export const signUpPath = "/sign-up";
export const signInPath = "/sign-in";
export const passwordForgottenPath = "/password-forgot";

export const accountProfilePath = "/account/profile";
export const accountPasswordPath = "/account/password";

export const choresPath = "/chores";

export function chorePath(choreId: string) {
  return `/chores/${choreId}`;
}

export function choreEditPath(choreId: string) {
  return `/chores/${choreId}/edit`;
}
