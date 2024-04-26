import { IFilePickerResult } from "@pnp/spfx-property-controls";

export interface ISpfxPopupProps {
  filePickerResult: IFilePickerResult;
  content: string;
  title: string;
  active: boolean;
  subtitle: string;
  link: string;
}
