declare namespace ReactHyperscriptHelpers {
  function h1(text: string): any;
  function h(a: any, b: any): any;
  function h(a: any, b: any, c: any): any;
}

declare module "react-hyperscript-helpers" {
  export = ReactHyperscriptHelpers;
}
