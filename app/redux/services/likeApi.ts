import { api } from "./api";

const BASE_URL = "/like";

export const likeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    increaseLikeCount: build.mutation({
      query: (body) => ({
        url: `${BASE_URL}/increase-like-count`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useIncreaseLikeCountMutation } = likeApi;
