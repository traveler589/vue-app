/**
 *
 * @author L
 * @since 2023-08-21 18:28:22
 */

export const getMenus = (list, url = "") => {
  return list
    .map(({ icon, name, meta, path, children }) => {
      if (meta.hidden) {
        return null;
      }

      const nextPath = `${url}/${path}`;
      const menu = {
        icon,
        key: name,
        path: nextPath,
        label: meta.title,
      };

      if (children?.length) {
        Object.assign(menu, {
          children: getMenus(children, nextPath),
        });
      }

      return menu;
    })
    .filter(Boolean);
};
