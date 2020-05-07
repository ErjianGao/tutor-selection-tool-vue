import { AUTHORIZATION } from "@/util/consts";

export function getAuthorization() {
  return sessionStorage.getItem(AUTHORIZATION);
}
