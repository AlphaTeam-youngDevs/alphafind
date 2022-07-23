import { createSelector } from "reselect";

const select = (state) => state.search;

export const searchSelector = createSelector(
  [select],
  (select) => select.search
);
