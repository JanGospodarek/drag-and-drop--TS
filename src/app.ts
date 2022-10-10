///<reference path="model/dragInterfaces.ts" />
///<reference path="model/projectModel.ts" />
///<reference path="state/state.ts" />
///<reference path="util/validate.ts" />
///<reference path="decorators/autobindDec.ts" />
///<reference path="components/base.ts" />
///<reference path="components/projectInput.ts" />
///<reference path="components/projectItem.ts" />
///<reference path="components/projectList.ts" />
namespace App {
  new ProjectInput();

  new ProjectList("active");
  new ProjectList("finished");
}
