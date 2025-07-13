import { Reducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { likeApi } from "../services/likeApi";

interface ErrorPayload {
  data: {
    message: string;
  };
}

export interface likeStatePayload {
  loading: boolean;
  success: boolean;
  error: string;
  message: string | null;
}

export const initialLikeState: likeStatePayload = {
  loading: true,
  success: false,
  error: "",
  message: "",
};

export const likeSlice = createSlice({
  name: "like",
  initialState: initialLikeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        likeApi.endpoints.increaseLikeCount.matchFulfilled,
        (state) => {
          state.loading = false;
          state.success = true;
        }
      )
      .addMatcher(
        (action): action is PayloadAction<ErrorPayload> =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "likeApi",
        (state, action) => {
          state.loading = false;
          state.error = action.payload.data?.message;
        }
      );
  },
});

export const likeReducer = likeSlice.reducer as Reducer<likeStatePayload>;

export const {} = likeSlice.actions;
