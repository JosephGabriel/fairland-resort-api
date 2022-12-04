import { getClient, setupDatabase, userForTest } from "../utils/index";
import bcrypt from "bcrypt";

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

  //Update User
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,

  //Update User Password
  UpdateUserPasswordDocument,
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,

  //Verify User
  VerifyUserDocument,
  VerifyUserMutation,
  VerifyUserMutationVariables,
} from "../generated/graphql";

beforeEach(setupDatabase);

describe("User Mutations", () => {
  it("should login", async () => {
    const client = getClient();

    const { data } = await client.mutate<
      LoginUserMutation,
      LoginUserMutationVariables
    >({
      mutation: LoginUserDocument,
      variables: {
        data: {
          email: userForTest.user!.email,
          password: userForTest.raw_password,
        },
      },
    });

    expect(data?.loginUser.user.userName).toBe("Test");
  });

  it("should not do login when give a wrong credential", async () => {
    const client = getClient();

    expect(
      await client.mutate<LoginUserMutation, LoginUserMutationVariables>({
        mutation: LoginUserDocument,
        variables: {
          data: {
            email: userForTest.user!.email,
            password: "wrong_password",
          },
        },
      })
    ).rejects.toThrow();
  });

  it("should create one user", async () => {
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
          password: userForTest.raw_password,
          passwordConfirm: userForTest.raw_password,
        },
      },
    });

    expect(data?.createUser.user.userName).toBe("Test2");
  });

  it("should create one admin", async () => {
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
          password: userForTest.raw_password,
          passwordConfirm: userForTest.raw_password,
          userName: "Admin-test",
        },
      },
    });

    expect(data!.createAdmin.user.userName).toBe("Admin-test");
  });

  it("should deactivate one user", async () => {
    const client = getClient(userForTest.token);

    const { data } = await client.mutate<
      DeactivateUserMutation,
      DeactivateUserMutationVariables
    >({
      mutation: DeactivateUserDocument,
    });

    expect(data!.deactivateUser).toBe("Usuário Desativado");
  });

  it("should update user", async () => {
    const client = getClient(userForTest.token);

    const { data } = await client.mutate<
      UpdateUserMutation,
      UpdateUserMutationVariables
    >({
      mutation: UpdateUserDocument,
      variables: {
        data: {
          firstName: "Updated",
          userName: "User",
        },
      },
    });

    expect(data!.updateUser.user.firstName).toBe("Updated");
    expect(data!.updateUser.user.userName).toBe("User");
    expect(data!.updateUser.user.lastName).toBe(userForTest.user!.lastName);
  });

  it("should update user password", async () => {
    const client = getClient(userForTest.token);

    const { data, errors } = await client.mutate<
      UpdateUserPasswordMutation,
      UpdateUserPasswordMutationVariables
    >({
      mutation: UpdateUserPasswordDocument,
      variables: {
        data: {
          password: "Testing95!",
          passwordConfirm: "Testing95!",
        },
      },
    });

    const password = data!.updateUserPassword.user.password;

    const decodedPassword = await bcrypt.compare("Testing95!", password);

    expect(decodedPassword).toBe(true);
  });

  it("should reject to update user password", async () => {
    const client = getClient(userForTest.token);

    await expect(
      client.mutate<
        UpdateUserPasswordMutation,
        UpdateUserPasswordMutationVariables
      >({
        mutation: UpdateUserPasswordDocument,
        variables: {
          data: {
            password: "Password95!",
            passwordConfirm: "Password95!",
          },
        },
      })
    ).rejects.toThrow();
  });

  it("should verify an user", async () => {
    const client = getClient(userForTest.token);

    const { data } = await client.mutate<
      VerifyUserMutation,
      VerifyUserMutationVariables
    >({
      mutation: VerifyUserDocument,
    });

    expect(data!.verifyUser.user.verified).toBe(true);
  });
});
