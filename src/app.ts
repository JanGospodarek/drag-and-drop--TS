function autobind(
  _target: any,
  _method: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(valInput: Validatable) {
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

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );
    this.hostElement = <HTMLDivElement>document.getElementById("app")!;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = "user-input";
    ///////////
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );
    ////////////
    this.configure();
    this.attach();
  }
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDesc = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    const titleVal: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descVal: Validatable = {
      value: enteredDesc,
      required: true,
      minLength: 5,
    };
    const peopleVal: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (!validate(titleVal) || !validate(descVal) || !validate(peopleVal)) {
      alert("Invalid input, please try again");
      // return;
    } else {
      return [enteredTitle, enteredDesc, +enteredPeople];
    }
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
  @autobind
  private submitHAndler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }
  }
  private configure() {
    this.element.addEventListener("submit", this.submitHAndler);
  }
}
const prjInput = new ProjectInput();
