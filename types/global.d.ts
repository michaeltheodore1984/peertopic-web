declare global {
  var _models: {
    User: typeof User;
    Tutor: typeof Tutor;
    Category: typeof Category;
    Topic: typeof Topic;
  } | undefined;
}

export { }