import * as React from "react";
import type { ISpfxPopupProps } from "./ISpfxPopupProps";
import { IIconProps, IconButton, Modal, PrimaryButton } from "@fluentui/react";
import { ISpfxPopupState } from "./ISpfxPopupState";
import styles from "./SpfxPopup.module.scss";
import * as strings from "SpfxPopupWebPartStrings";

const cancelIcon: IIconProps = { iconName: "Cancel" };
export default class SpfxPopup extends React.Component<
  ISpfxPopupProps,
  ISpfxPopupState
> {
  constructor(props: ISpfxPopupProps) {
    super(props);
    this.state = {
      isModalOpen: this.props.active,
    };
  }

  private handleCloseDialog = (): void => {
    this.setState({
      isModalOpen: false,
    });
  };

  public render(): React.ReactElement<ISpfxPopupProps> {
    return (
      <>
        <Modal
          titleAriaId={"Modal"}
          isOpen={this.state.isModalOpen}
          onDismiss={this.handleCloseDialog}
          isBlocking={false}
          containerClassName={styles.containerPopUp}
          scrollableContentClassName={styles.scrollableContentClass}
        >
          <IconButton
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={this.handleCloseDialog}
            className={styles.closeIcon}
          />
          {this.props.filePickerResult ? (
            <div className={styles.popUpWithImage}>
              <img
                title={this.props.filePickerResult.fileName}
                className={styles.popUpImage}
                src={this.props.filePickerResult?.fileAbsoluteUrl}
              />
              <div className={styles.popUpDetails}>
                <h1>{this.props.title}</h1>
                <h3>{this.props.subtitle}</h3>
                <p>{this.props.content}</p>
                {this.props.link ? (
                  <PrimaryButton
                    target="_blank"
                    text={strings.PropertyButtonLink}
                    href={this.props.link}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.popUpWithoutImage}>
              <h1>{this.props.title}</h1>
              <h3>{this.props.subtitle}</h3>
              <p>{this.props.content}</p>
              {this.props.link ? (
                <PrimaryButton
                  target="_blank"
                  text={strings.PropertyButtonLink}
                  href={this.props.link}
                />
              ) : (
                <></>
              )}
            </div>
          )}
        </Modal>
      </>
    );
  }
}
