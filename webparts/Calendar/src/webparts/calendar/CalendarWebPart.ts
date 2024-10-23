import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CalendarWebPartStrings';
import Calendar from './components/CalendarComponent';
import { ICalendarProps } from './components/ICalendarProps';

export interface ICalendarWebPartProps {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
  title: string;
  list: string;
  configList: string;
}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICalendarProps> = React.createElement(
      Calendar,
      {
        context: this.context,
        title: this.properties.title,
        list: this.properties.list,
        configList: this.properties.configList,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('list', {
                  label: strings.ListFieldLabel
                }),
                PropertyPaneTextField('configList', {
                  label: strings.ConfigListFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
