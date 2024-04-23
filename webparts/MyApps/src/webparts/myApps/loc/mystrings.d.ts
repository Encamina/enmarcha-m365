declare interface IMyAppsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;

  // New strings
  MyApps: string;
  AllApps: string;
  Config: string;
  MainColor: string;
}

declare module "MyAppsWebPartStrings" {
  const strings: IMyAppsWebPartStrings;
  export = strings;
}
