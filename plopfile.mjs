/**
 * @param {import("plop").NodePlopAPI} plop
 */
export default function config(plop) {
  plop.setGenerator("component", {
    description: "React Component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
      {
        type: "input",
        name: "destination",
        message: "Where do you want to create the component?",
        default: "src/app/ui",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "{{destination}}/{{pascalCase name}}",
        base: "plop-templates/components/",
        templateFiles: "plop-templates/components/*",
      },
    ],
  });
}
