/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { sp } from "@pnp/pnpjs";
import { createCard, createCardContainer } from "../utils/CreateCardObject";

export const useGetApps = (user: any, context: any, init: boolean): Array<any> => {

    if (!user) {
        console.error("No se pudo obtener el usuario");
        return []
    }

    sp.setup({
        spfxContext: context.web,
        sp: {
            baseUrl: context._web.absoluteUrl
        }
    });

    const [userApps, setUserApps] = useState([]);

    useEffect(() => {

        sp.web.lists
            .getByTitle("MyAppsFavorites")
            .items.filter(`ENC_User eq '${user.loginName}'`).select("ENC_IDApp")
            .get()
            .then(async (favouritesData) => {

                sp.web.lists.getByTitle("MyAppsLinks").items.
                    select("*").get().then(
                        async (appData: any) => {
                            const rootWeb = await sp.site.rootWeb();
                            const data = parseResults(appData, favouritesData, rootWeb.Url);
                            setUserApps(data);
                        }
                    )
                    .catch(() => "");

            })
            .catch(() => "");

    }, [init])
    return userApps
}

const parseResults = (appData: Array<any>, favouritesData: Array<any>, environment: string): Array<any> => {
    
    if (!appData.length) return [];

    const data: any[] = [];
    const favorites: Array<any> = [];
    //get favorites IDApp for this user
    favouritesData.map(item => favorites.push(item.ENC_IDApp))
    appData.filter((item) => item.ENC_IsGrouper).map(item => {
        if(!data.some((dataItem) => dataItem === item)){
            data.push(createCardContainer(item,favorites, environment));
        }
    }
    )
    appData.filter((item) => !item.ENC_IsGrouper)
           .map(item => {
                const index = item.ENC_Group === null?-1 : data.findIndex((dataItem) => dataItem.group === item.ENC_Group);
                if(index !== -1){
                    data[index].apps.push(createCard(item,favorites, environment));
                }
                else{
                    data.push(createCard(item,favorites, environment))
                }
            })
    return data;
}