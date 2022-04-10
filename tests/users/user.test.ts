import { getClient, setupDatabase, userForTest } from "../utils/index";

import {
  //Login user
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,

  //Create user
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,

  //Admin
  CreateAdminDocument,
  CreateAdminMutation,
  CreateAdminMutationVariables,

  //Deactvate User
  DeactivateUserDocument,
  DeactivateUserMutation,
  DeactivateUserMutationVariables,
} from "../generated/graphql";

beforeEach(setupDatabase);

describe("User", () => {
  test("Should login", async () => {
    const client = getClient();

    const { data } = await client.mutate<
      LoginUserMutation,
      LoginUserMutationVariables
    >({
      mutation: LoginUserDocument,
      variables: {
        data: {
          email: "test@test.com",
          password: "Daredevil95!",
        },
      },
    });

    expect(data.loginUser.user.userName).toBe("Test");
  });

  test("Should create user", async () => {
    const client = getClient();

    const { data } = await client.mutate<
      CreateUserMutation,
      CreateUserMutationVariables
    >({
      mutation: CreateUserDocument,
      variables: {
        data: {
          email: "test2@test.com",
          firstName: "Test2",
          lastName: "Test2",
          userName: "Test2",
          password: "Daredevil95!",
          passwordConfirm: "Daredevil95!",
        },
      },
    });

    expect(data.createUser.user.userName).toBe("Test2");
  });

  test("Should create admin", async () => {
    const client = getClient(userForTest.token);

    const { data } = await client.mutate<
      CreateAdminMutation,
      CreateAdminMutationVariables
    >({
      mutation: CreateAdminDocument,
      variables: {
        data: {
          email: "admin@admin.com",
          firstName: "Admin-test",
          lastName: "Admin-test",
          password: "Daredevil95!",
          passwordConfirm: "Daredevil95!",
          userName: "Admin-test",
        },
      },
    });

    expect(data.createAdmin.user.userName).toBe("Admin-test");
  });

  test("Should deactivate user", async () => {
    const client = getClient(userForTest.token);

    try {
      const { data } = await client.mutate<
        DeactivateUserMutation,
        DeactivateUserMutationVariables
      >({
        mutation: DeactivateUserDocument,
      });

      expect(data.deactivateUser).toBe("Usuário Desativado");
    } catch (error) {
      console.error(error);
    }
  });
});
