export const userExists = async (
  condition,
  prisma,
  message = "Usuário inválido"
) => {
  const userExists = await prisma.user.findUnique({
    where: condition,
  });

  if (userExists) {
    throw new Error(message);
  }

  return userExists;
};

export const userNotExists = async (
  condition,
  prisma,
  message = "Usuário inválido"
) => {
  const userExists = await prisma.user.findUnique({
    where: condition,
  });

  if (!userExists) {
    throw new Error(message);
  }

  return userExists;
};
