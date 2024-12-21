import { configureStore } from '@reduxjs/toolkit';
import { ArticleApi } from '../services/articleApi';
import { CategApi } from '../services/CategorieApi';
import localProductReducer from '../services/localData';
import { clientApi } from '../services/ClientApi';
import { AdminApi } from '../services/AdminApi';
import { CommandeApi } from '../services/CommandeApi';
import { PackApi } from '../services/PackApi';

export default configureStore({
    reducer: {
        [ArticleApi.reducerPath]: ArticleApi.reducer,
        [CategApi.reducerPath]: CategApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer,
        [CommandeApi.reducerPath]: CommandeApi.reducer,
        [PackApi.reducerPath]: PackApi.reducer,
        localProducts: localProductReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(ArticleApi.middleware)
            .concat(CategApi.middleware)
            .concat(clientApi.middleware)
            .concat(AdminApi.middleware)
            .concat(CommandeApi.middleware)
            .concat(PackApi.middleware),
});
