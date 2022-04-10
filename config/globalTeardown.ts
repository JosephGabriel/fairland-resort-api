export default async () => {
  await global.apolloServer.stop();

  await global.expressServer.close(() => {
    console.log("Server was closed");
  });
};
