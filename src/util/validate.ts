namespace App {
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(valInput: Validatable) {
    let isValid = true;
    if (valInput.required) {
      isValid = isValid && valInput.value.toString().trim().length !== 0;
    }
    if (valInput.minLength != null && typeof valInput.value === "string") {
      isValid = isValid && valInput.value.length >= valInput.minLength;
    }
    if (valInput.maxLength != null && typeof valInput.value === "string") {
      isValid = isValid && valInput.value.length <= valInput.maxLength;
    }
    if (valInput.min != null && typeof valInput.value === "number") {
      isValid = isValid && valInput.value >= valInput.min;
    }
    if (valInput.max != null && typeof valInput.value === "number") {
      isValid = isValid && valInput.value <= valInput.max;
    }
    return isValid;
  }
}
