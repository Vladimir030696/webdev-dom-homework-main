export let lik = [
  //  {
  //   name: "Глеб Фокин",
  //   text: "Это будет первый комментарий на этой странице",
  //   liki: 3,
  //   date: "12.02.22 12:18",
  //     isLiked: false
  //  },
  //  {
  //   name: "Варвара Н.",
  //   text: "Мне нравится как оформлена эта страница! ❤",
  //   liki: 75,
  //   date: "13.02.22 19:22",
  //   isLiked: false
  //  }
];

export let updateTasks = (mewTasks) => {
  if (!mewTasks) {
    console.error("Данные не получены");
    return;
  }
  lik = mewTasks.map((comment) => ({
    name: comment.author.name,
    date: new Date(comment.date).toLocaleString(),
    text: comment.text,
    liki: comment.likes,
    isLiked: comment.isLiked,
  }));
};
