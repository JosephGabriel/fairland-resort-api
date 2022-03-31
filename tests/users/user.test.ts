import { client } from "../utils/index";

import {
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "../generated/graphql";

describe("User", () => {
  test("Should return", async () => {
    const { data } = await client.mutate<
      LoginUserMutation,
      LoginUserMutationVariables
    >({
      mutation: LoginUserDocument,
      variables: {
        data: {
          email: "",
          password: "",
        },
      },
    });

    expect(data.loginUser.user.userName).toBe("joseph");
  });
});
