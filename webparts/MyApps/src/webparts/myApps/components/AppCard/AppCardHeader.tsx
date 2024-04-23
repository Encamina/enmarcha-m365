import * as React from "react"
import styles from "../MyApps.module.scss";
interface IAppInfoCard{
    imageUrl: string, 
    name: string, 
    category: string
}
export const AppCardHeader = (props:IAppInfoCard): JSX.Element => {
    const {imageUrl, name, category} = props;
    return (
        <div className={styles.infoFlexContainer}>
            <div className={styles.logoApp}>
                <img src={imageUrl} alt={`logo-${name}`} />
            </div>
            <div>
                <div className={styles.category}>{category}</div>
                <div className={styles.title}>{name}</div>
            </div>
        </div>
    )
}