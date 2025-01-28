const TryCatchHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

// const TryCatchHandler = (fn) => {
//   (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => {
//       next(err);
//     });
//   };
// };

export { TryCatchHandler };
