import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import articleService from "./ArticleServices";
import { initialState, resetArticleState } from "./ArticleState";

export const getArticles = createAsyncThunk(
  "article/get-all",
  async (thunkAPI) => {
    try {
      return await articleService.getArticles();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createArticle = createAsyncThunk(
  "article/create-one",
  async (article, thunkAPI) => {
    try {
      return await articleService.createArticle(article);
    } catch (error) {
      console.log("erour akhty :"+error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteArticleById = createAsyncThunk(
  "article/delete-one",
  async (id, thunkAPI) => {
    try {
      return await articleService.deleteArticleById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateArticle = createAsyncThunk(
  "article/update-one",
  async (article, thunkAPI) => {
    try {
      return await articleService.updateArticle(article);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateArticle = createAction("article/reset-state");

export const ArticleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-catalogs
      .addCase(getArticles.pending, (state) => {
        resetArticleState(state);
        state.getArticlesState.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.getArticlesState.isError = false;
        state.getArticlesState.isLoading = false;
        state.getArticlesState.isSuccess = true;
        state.getArticlesState.message = action.payload.message;
        state.articles = action.payload.articles;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.getArticlesState.isError = true;
        state.getArticlesState.isLoading = false;
        state.getArticlesState.isSuccess = false;
        console.log(action)
        state.getArticlesState.message = action.payload.error;
      })
      // get-all-catalogs
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteArticleById.pending, (state) => {
        resetArticleState(state);
        state.deleteArticleByIdState.isLoading = true;
      })
      .addCase(deleteArticleById.fulfilled, (state, action) => {
        state.deleteArticleByIdState.isError = false;
        state.deleteArticleByIdState.isLoading = false;
        state.deleteArticleByIdState.isSuccess = true;
        state.deleteArticleByIdState.message = action.payload.message;
        state.articles = state.articles.filter((article) => {
          return article.id != action.payload.id;
        });
      })
      .addCase(deleteArticleById.rejected, (state, action) => {
        state.deleteArticleByIdState.isError = true;
        state.deleteArticleByIdState.isLoading = false;
        state.deleteArticleByIdState.isSuccess = false;
        state.deleteArticleByIdState.message = action.payload.error;

      })
      // delete-one-by-id
      //   =========================================================================
      // create-one
      .addCase(createArticle.pending, (state) => {
        resetArticleState(state);
        state.createArticleState.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.createArticleState.isError = false;
        state.createArticleState.isLoading = false;
        state.createArticleState.isSuccess = true;
        state.createArticleState.message = action.payload.message;
        state.articles.unshift(action.payload.article);
      })
      .addCase(createArticle.rejected, (state, action) => {
        // state.message = action.payload.response.data.errors;
        state.createArticleState.isError = true;
        state.createArticleState.isLoading = false;
        state.createArticleState.isSuccess = false;
        state.createArticleState.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
      // update-one
      .addCase(updateArticle.pending, (state) => {
        resetArticleState(state);
        state.updateArticleState.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.updateArticleState.isError = false;
        state.updateArticleState.isLoading = false;
        state.updateArticleState.isSuccess = true;
        state.updateArticleState.message = action.payload.message;
        const index = state.articles.findIndex(e => e.id === action.payload.article.id);
        if (index !== -1) {
          state.articles[index] = action.payload.article;
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.updateArticleState.isError = true;
        state.updateArticleState.isLoading = false;
        state.updateArticleState.isSuccess = false;
        state.updateArticleState.message = action.payload.error;
      })
      // update-one
      //   =========================================================================
      //reset-state-catalog
      .addCase(resetStateArticle, (state) => {
        resetArticleState(state);
      });
  },
});

export default ArticleSlice.reducer;
