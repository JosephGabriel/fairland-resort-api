export default async () => {
  await global.expressServer.close(() => {
    console.log('Server was closed');
  });
};
