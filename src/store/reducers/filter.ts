import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { bookValues } from "src/utils/helpers";

interface State {
  filter?: typeof bookValues;
}

const initialState: State = {
  filter: undefined,
};

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterHandler: (state, { payload }: PayloadAction<typeof bookValues>) => {
      state.filter = payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter.filter;

export const { filterHandler } = filterReducer.actions;

export default filterReducer.reducer;
