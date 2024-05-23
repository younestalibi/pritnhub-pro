export const initialArticleState = {
  articles: [],
  getArticlesState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deleteArticleByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  createArticleState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  updateArticleState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetArticleState = (state) => {
  state.getArticlesState = { ...initialArticleState.getArticlesState };
  state.deleteArticleByIdState = {...initialArticleState.deleteArticleByIdState};
  state.createArticleState = { ...initialArticleState.createArticleState };
  state.updateArticleState = { ...initialArticleState.updateArticleState };
};
