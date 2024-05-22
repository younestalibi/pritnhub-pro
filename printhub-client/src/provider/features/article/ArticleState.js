export const initialState = {
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
    state.getArticlesState={
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    },
    state.deleteArticleByIdState={
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    },
    state.createArticleState={
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    }
    state.updateArticleState={
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    }
  };
  