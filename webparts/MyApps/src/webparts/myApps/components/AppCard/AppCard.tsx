/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import * as React from "react";
import styles from "../MyApps.module.scss";
import { Icon } from "office-ui-fabric-react";
import { _addToFavorites, _removeFromFavorites } from "../api";
import { AppCardHeader } from "./AppCardHeader";

export interface IAppCard {
  context: any;
  user: any;
  id: string;
  linkUrl: string;
  imageUrl: string;
  title: string;
  subTitle: string;
  isFavorite?: boolean;
  isDisabled?: boolean;
  handleFn: any;
  setDisabled: any;
  isGrouper: boolean;
  apps: any[];
  init: any;
  group: any;
  setInit: (init: any) => any;
  cardStyle: string;
  freeGroups: string[];
  mainColor: string;
}
export const AppCard: React.FunctionComponent<IAppCard> = ({
  context,
  user,
  id,
  linkUrl,
  imageUrl,
  title,
  subTitle,
  isFavorite = false,
  isDisabled,
  setDisabled,
  handleFn,
  isGrouper,
  apps,
  init,
  setInit,
  cardStyle,
  group,
  freeGroups,
  mainColor,
}) => {
  document.documentElement.style.setProperty("--main-color", mainColor);

  const [isDropDown, setIsDropDown] = React.useState(false);
  const [dropDownIcon, setDropDownIcon] = React.useState("ChevronDownSmall");
  const favoriteIcon = isFavorite ? "FavoriteStarFill" : "FavoriteStar";

  React.useEffect(() => {
    setDropDownIcon(isDropDown ? "ChevronUpSmall" : "ChevronDownSmall");
  }, [isDropDown]);

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDisabled) {
      setDisabled();
      e.currentTarget.onclick = null; //prevent additional clicks
      if (!isFavorite) {
        _addToFavorites(context, id, user.loginName)
          .then(() => handleFn())
          .catch(() => "");
      } else {
        _removeFromFavorites(context, id, user.loginName)
          .then(() => handleFn())
          .catch(() => "");
      }
    }
  };
  const isFreeGroup = () => {
    if (freeGroups) {
      return freeGroups.includes(group);
    }
    return false;
  };
  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles[cardStyle as keyof typeof styles]}`}
        onClick={() => {
          !isGrouper && window.open(linkUrl, "_blank");
        }}
      >
        <AppCardHeader imageUrl={imageUrl} name={title} category={subTitle} />
        {isGrouper && (
          <Icon
            iconName={dropDownIcon}
            onClick={() => setIsDropDown(!isDropDown)}
            className={styles.smallBlackIcon}
          />
        )}
        {(isGrouper || !group || isFreeGroup()) && (
          <Icon
            iconName={favoriteIcon}
            onClick={(e: any) => handleFav(e)}
            className={styles.smallStar}
          />
        )}
      </div>
      {apps && apps.length > 0 && (
        <div
          className={`${styles.appDropDown} ${isDropDown && styles.autoHeight}`}
        >
          {apps.map((item, index: number) => {
            item.context = context;
            item.user = user;
            item.isDisabled = isDisabled;
            item.cardStyle = "appCardSingle";
            item.setDisabled = function () {
              setDisabled(true);
            };
            item.handleFn = function () {
              setDisabled(false);
              setInit(!init);
            };
            return <AppCard key={index} {...item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AppCard;
