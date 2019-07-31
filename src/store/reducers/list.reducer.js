import * as types from "../../constants/action-types.constant";

const initialState = {
  isListLoading: false,
  list: null,
  isListError: false,
  isDiscoverListLoading: false,
  discoverList: null,
  isDiscoverListError: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LIST_REQUEST:
      return {
        ...state,
        isListLoading: true,
        list: null,
        isListError: null
      };
    case types.LIST_REQUEST_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        isListLoading: false
      };
    case types.LIST_REQUEST_ERROR:
      return {
        ...state,
        isListError: action.error.data,
        isListLoading: false
      };
    case types.DISCOVER_REQUEST:
      return {
        ...state,
        isDiscoverListLoading: true,
        discoverList: null,
        isDiscoverListError: null
      };
    case types.DISCOVER_REQUEST_SUCCESS:
      return {
        ...state,
        discoverList: action.payload.data,
        isDiscoverListLoading: false
      };
    case types.DISCOVER_REQUEST_ERROR:
      return {
        ...state,
        isDiscoverListError: action.error.data,
        isDiscoverListLoading: false
      };
    default:
      return state;
  }
}
