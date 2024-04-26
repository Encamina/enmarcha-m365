declare interface ISpfxPopupWebPartStrings {
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
  UnknownEnvironment: string;
  PropertyTitle: string;
  PropertySubtitle: string;
  PropertyContent: string;
  PropertyLink: string;
  PropertyImage: string;
  PropertyUploadImage: string;
  PropertyActiveOn: string;
  PropertyActiveOff: string;
  PropertyButtonLink: string;
  PropertyStatus: string;
}

declare module "SpfxPopupWebPartStrings" {
  const strings: ISpfxPopupWebPartStrings;
  export = strings;
}
