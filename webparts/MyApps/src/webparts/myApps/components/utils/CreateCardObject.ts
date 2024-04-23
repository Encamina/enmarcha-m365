/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const createCard = (item:any,favorites:any[], environment: string) => {
    return (
        {
            id:item.ID,
            title: item.Title,
            subTitle: item.ENC_Category,
            imageUrl: getCardImg(item, environment),
            isFavorite: favorites.indexOf(String(item.ID)) > -1,
            group: item.ENC_Group,
            isGrouper: item.ENC_IsGrouper,
            linkUrl:item.ENC_Url
        }
    )
} 
export const createCardContainer = (item:any,favorites:any[],environment:string) => {
    const emptyApps: any[] = [];
    return (
        {
            id:item.ID,
            title: item.Title,
            subTitle: item.ENC_Category,
            imageUrl: getCardImg(item, environment),
            isFavorite: favorites.indexOf(String(item.ID)) > -1,
            group: item.ENC_Group,
            isGrouper: item.ENC_IsGrouper,
            apps: emptyApps
        }
    )
} 
const getCardImg = (item: any, environment: string) => {
    const jsonImgParsed = JSON.parse(item.ENC_Icon)
    let imgSrc = jsonImgParsed.serverRelativeUrl;
    if(!imgSrc){
        imgSrc = `${environment}/Lists/MyAppsLinks/Attachments/${item.ID}/${jsonImgParsed.fileName}`
    }
    return imgSrc
}