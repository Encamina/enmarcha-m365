declare interface ICalendarWebPartStrings {
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
  TitleFieldLabel: string;
  ListFieldLabel: string;
  ConfigListFieldLabel: string;
  Events: string
}

declare module "CalendarWebPartStrings" {
  const strings: ICalendarWebPartStrings;
  export = strings;
}
