export const homePath = "/";

export const signUpPath = "/sign-up";
export const signInPath = "/sign-in";
export const passwordForgottenPath = "/password-forgot";

export const accountProfilePath = "/account/profile";
export const accountPasswordPath = "/account/password";

export const ticketsPath = "/tickets";

export function ticketPath(ticketId: string) {
  return `/tickets/${ticketId}`;
}

export function ticketEditPath(ticketId: string) {
  return `/tickets/${ticketId}/edit`;
}
