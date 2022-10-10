namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
      super("project-input", "app", true, "user-input");

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
    }
    configure() {
      this.element.addEventListener("submit", this.submitHAndler);
    }
    renderContent(): void {}
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

    @autobind
    private submitHAndler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  }
}
