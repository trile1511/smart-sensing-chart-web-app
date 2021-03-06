import {ARTICLE_NAMES} from "../../constants/constants";
import {GLOBAL_ARTICLE_FILTER} from "../actions/globalArticleActions";

const initialState = {
    selectedArticle: ARTICLE_NAMES.entries().next().value,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GLOBAL_ARTICLE_FILTER:
            return {
                ...state,
                selectedArticle: action.selectedArticle,
            };
        default:
            return state;
    }
}
