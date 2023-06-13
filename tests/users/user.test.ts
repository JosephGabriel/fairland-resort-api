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

describe("Users", () => {
  describe("Mutations", () => {
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

    it("should not do login when give a wrong email", async () => {
      const client = getClient();

      try {
        await client.mutate<LoginUserMutation, LoginUserMutationVariables>({
          mutation: LoginUserDocument,
          variables: {
            data: {
              email: "xcdcr@email.com",
              password: userForTest.raw_password,
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Email ou senha inválida");
      }
    });

    it("should not do login when give a wrong password", async () => {
      const client = getClient();

      try {
        await client.mutate<LoginUserMutation, LoginUserMutationVariables>({
          mutation: LoginUserDocument,
          variables: {
            data: {
              email: userForTest.user!.email,
              password: "Wrong_124566499!",
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Email ou senha inválida");
      }
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

    it("should not create one user when passwords do not match", async () => {
      const client = getClient();

      try {
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
              passwordConfirm: `${userForTest.raw_password}222`,
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("As senhas não coincidem");
      }
    });

    it("should not create one user when email is already in use", async () => {
      const client = getClient();

      try {
        const { data } = await client.mutate<
          CreateUserMutation,
          CreateUserMutationVariables
        >({
          mutation: CreateUserDocument,
          variables: {
            data: {
              email: userForTest.user!.email,
              firstName: "Test2",
              lastName: "Test2",
              userName: "Test2",
              password: userForTest.raw_password,
              passwordConfirm: userForTest.raw_password,
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe(
          "Este email já esta em uso"
        );
      }
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

    it("should not create one admin when passwords do not match", async () => {
      const client = getClient(userForTest.token);

      try {
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
              userName: "Admin-test",
              password: userForTest.raw_password,
              passwordConfirm: userForTest.raw_password + "3333",
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("As senhas não coincidem");
      }
    });

    it("should not create one admin when email is already in use", async () => {
      const client = getClient(userForTest.token);

      try {
        const { data } = await client.mutate<
          CreateAdminMutation,
          CreateAdminMutationVariables
        >({
          mutation: CreateAdminDocument,
          variables: {
            data: {
              email: userForTest.user!.email,
              firstName: "Admin-test",
              lastName: "Admin-test",
              userName: "Admin-test",
              password: userForTest.raw_password,
              passwordConfirm: userForTest.raw_password,
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe(
          "Este email já esta em uso"
        );
      }
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

    it("should not deactivate one user when there is no header", async () => {
      const client = getClient();

      try {
        const { data } = await client.mutate<
          DeactivateUserMutation,
          DeactivateUserMutationVariables
        >({
          mutation: DeactivateUserDocument,
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Você não esta logado");
      }
    });

    it("should not deactivate one user when there is an invalid header", async () => {
      const client = getClient("xxxxxxxxxxx");

      try {
        const { data } = await client.mutate<
          DeactivateUserMutation,
          DeactivateUserMutationVariables
        >({
          mutation: DeactivateUserDocument,
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Token inválido");
      }
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

    it("should not update user when there is an invalid header", async () => {
      const client = getClient("xxxxxxxx");

      try {
        await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
          mutation: UpdateUserDocument,
          variables: {
            data: {
              firstName: "Updated",
              userName: "User",
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Token inválido");
      }
    });

    it("should not update user when there is no header", async () => {
      const client = getClient();

      try {
        await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
          mutation: UpdateUserDocument,
          variables: {
            data: {
              firstName: "Updated",
              userName: "User",
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("Você não esta logado");
      }
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

    it("should not update user password when passwords dont match", async () => {
      const client = getClient(userForTest.token);

      try {
        const { data } = await client.mutate<
          UpdateUserPasswordMutation,
          UpdateUserPasswordMutationVariables
        >({
          mutation: UpdateUserPasswordDocument,
          variables: {
            data: {
              password: "Testing954!",
              passwordConfirm: "Testing95!",
            },
          },
        });
      } catch (error) {
        expect(error.graphQLErrors[0].message).toBe("As senhas não coincidem");
      }
    });

    it("should reject to update user password when it contains password", async () => {
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
});
