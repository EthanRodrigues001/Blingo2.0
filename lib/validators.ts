export async function validateString(value: string) {
  if (!value || typeof value !== "string" || value.trim().length === 0) {
    return false;
  }
  return true;
}

export async function validateEmail(value: string) {
  if (!value) {
    return "This field is required";
  }
  if (!value.includes("@")) {
    return "This field must be an email";
  }
  return null;
}
