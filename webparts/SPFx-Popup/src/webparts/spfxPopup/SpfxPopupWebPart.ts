import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneTextField,
  PropertyPaneToggle,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "SpfxPopupWebPartStrings";
import SpfxPopup from "./components/SpfxPopup";
import { ISpfxPopupProps } from "./components/ISpfxPopupProps";
import {
  IFilePickerResult,
  PropertyFieldFilePicker,
} from "@pnp/spfx-property-controls";

export interface ISpfxPopupWebPartProps {
  filePickerResult: IFilePickerResult;
  content: string;
  title: string;
  active: boolean;
  subtitle: string;
  link: string;
}

export default class SpfxPopupWebPart extends BaseClientSideWebPart<ISpfxPopupWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ISpfxPopupProps> = React.createElement(
      SpfxPopup,
      {
        filePickerResult: this.properties.filePickerResult,
        content: this.properties.content,
        title: this.properties.title,
        subtitle: this.properties.subtitle,
        active: this.properties.active,
        link: this.properties.link,
      },
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "",
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldFilePicker("image", {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.filePickerResult = e;
                  },
                  onChanged: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.filePickerResult = e;
                  },
                  key: "filePickerId",
                  buttonLabel: strings.PropertyUploadImage,
                  label: strings.PropertyImage,
                  accepts: ["*.jpg", "*.jpeg", "*.png"],
                }),
                PropertyPaneTextField("title", {
                  label: strings.PropertyTitle,
                }),
                PropertyPaneTextField("subtitle", {
                  label: strings.PropertySubtitle,
                }),
                PropertyPaneTextField("content", {
                  label: strings.PropertyContent,
                  multiline: true,
                  rows: 5,
                }),
                PropertyPaneTextField("link", {
                  label: strings.PropertyLink,
                  placeholder: "https://",
                }),
                PropertyPaneToggle("active", {
                  key: "activePaneId",
                  offText: strings.PropertyActiveOff,
                  onText: strings.PropertyActiveOn,
                  label: strings.PropertyStatus,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
