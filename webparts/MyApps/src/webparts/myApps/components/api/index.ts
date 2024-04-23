import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

import { sp } from "@pnp/pnpjs";

export const _addToFavorites = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
  IdApp: string,
  user: string
): Promise<void> => {
  sp.setup({
    spfxContext: context.web,
    sp: {
      baseUrl: context._web.absoluteUrl,
    },
  });

  await sp.web.lists
    .getByTitle("MyAppsFavorites")
    .items.add({
      ENC_IDApp: String(IdApp),
      ENC_User: user,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((r: any) => {
      ("");
    })
    .catch((error) => {
      ("");
    });
};
const _deleteListItemById = async (
  list: string,
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
): Promise<void> => {
  try {
    sp.setup({
      spfxContext: context.web,
      sp: {
        baseUrl: context._web.absoluteUrl,
      },
    });
    const result = await sp.web.lists
      .getByTitle(list)
      .items.getById(id)
      .delete();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const _removeFromFavorites = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
  IdApp: string,
  user: string
): Promise<void> => {
  sp.setup({
    spfxContext: context.web,
    sp: {
      baseUrl: context._web.absoluteUrl,
    },
  });
  await sp.web.lists
    .getByTitle("MyAppsFavorites")
    .items.filter(`ENC_User eq '${user}' and  ENC_IDApp eq '${IdApp}'`)
    .get()
    .then(async (item) => {
      await _deleteListItemById("MyAppsFavorites", item[0].Id, context);
    });
};
