/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styles from "./MyApps.module.scss";
import { IMyAppsProps } from "./interface/IMyAppsProps";
import { Pivot, PivotItem } from "office-ui-fabric-react";
import { useGetApps } from "./hooks/useGetApps";
import { AppCard } from "./AppCard/AppCard";
import * as strings from "MyAppsWebPartStrings";
export const MyApps: React.FunctionComponent<IMyAppsProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
  user,
  context,
  mainColor,
}) => {
  const [init, setInit] = React.useState(true);
  const [isDisabled, setDisabled] = React.useState(false);
  const myApps: Array<any> = useGetApps(user, context, init);
  const unassignedGroups = getUnassignedGroups(myApps);
  return (
    <section
      className={`${styles.myApps} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <Pivot aria-label="Apps Pivot">
        <PivotItem
          headerText={strings.MyApps + " "}
          headerButtonProps={{
            "data-order": 1,
            "data-title": "Mis aplicaciones ",
          }}
        >
          <div className={`${styles.appCardContainer}`}>
            {myApps &&
              myApps.map((item) => {
                item.context = context;
                item.user = user;
                item.isDisabled = isDisabled;
                item.cardStyle = "appCard";
                item.setDisabled = function () {
                  setDisabled(true);
                };
                item.handleFn = function () {
                  setDisabled(false);
                  setInit(!init);
                };
                return (
                  item.isFavorite && (
                    <AppCard
                      {...item}
                      freeGroups={unassignedGroups}
                      mainColor={mainColor}
                    />
                  )
                );
              })}
          </div>
        </PivotItem>
        <PivotItem headerText={strings.AllApps + " "}>
          <div className={`${styles.appCardContainer}`}>
            {myApps &&
              myApps.map((item, index: number) => {
                item.context = context;
                item.user = user;
                item.isDisabled = isDisabled;
                item.cardStyle = "appCard";
                item.setDisabled = function () {
                  setDisabled(true);
                };
                item.handleFn = function () {
                  setDisabled(false);
                  setInit(!init);
                };
                return (
                  <AppCard
                    key={index}
                    {...item}
                    freeGroups={unassignedGroups}
                  />
                );
              })}
          </div>
        </PivotItem>
      </Pivot>
    </section>
  );
};

const getUnassignedGroups = (myApps: any[]) => {
  const groupsOnContainers: string[] = myApps
    .filter((app: any) => app.isGrouper)
    .map((container: any) => {
      return container.group;
    });
  const groupsNotContainers: string[] = myApps
    .filter((app: any) => !app.isGrouper)
    .map((container: any) => {
      return container.group;
    });
  const unassignedGroups: string[] = groupsNotContainers.filter(
    (group: string) => !groupsOnContainers.includes(group)
  );
  return unassignedGroups;
};

export default MyApps;
