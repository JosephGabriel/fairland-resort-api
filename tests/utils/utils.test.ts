import { hashPassword, verifyPassword } from "../../src/utils/password";
import { signUpToken, verifyToken } from "../../src/utils/token";

describe("Utils Functions", () => {
  it("should hash and verify one password", async () => {
    const hashedPassword = await hashPassword("PasswordToTest");

    const decodedPassword = await verifyPassword(
      "PasswordToTest",
      hashedPassword
    );

    expect(decodedPassword).toBe(true);
  });

  it("should create a valid token and validate", async () => {
    const token = await signUpToken("TestingToken");

    const decodedToken = await verifyToken(`Bearer ${token}`);

    expect(decodedToken.id).toBe("TestingToken");
  });
});
