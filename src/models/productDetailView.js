import group from "../mock/group.json";

const fetchGroup = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return group;
};

const selectBreadcrumb = category => {
  if (!category) {
    return [];
  }
  const { name = "unknown", _id } = category;
  return [...category.parents, { name, _id }];
};

export const productDetailView = {
  state: {
    filter: null,
    breadcrumb: [],
    variations: [],
    activeVariationId: null,
    seller: null,
    variationsExpanded: false,
    group: {
      price: null,
      priceChange: null,
      title: null,
      brand: null,
      description: null,
      favorite: false,
      star: 5,
      sold: null,
      linkedCount: null,
      linked: false,
      view: null,
      images: [],
      tags: []
    },
    cart: {},
    activeTabKey: "1",
    loading: true
  },
  reducers: {
    toggleFavorite(state) {
      return {
        ...state,
        favorite: !state.favorite
      };
    },
    setActiveVariationId(state, payload) {
      return {
        ...state,
        activeVariationId: payload
      };
    },
    setActiveTabKey(state, payload) {
      return {
        ...state,
        activeTabKey: payload
      };
    },
    setVariationsExpanded(state, payload) {
      return {
        ...state,
        variationsExpanded: payload
      };
    },
    setFilter(state, payload) {
      return {
        ...state,
        filter: payload,
        activeVariationId: null
      };
    },
    setGroup(state, payload) {
      return {
        ...state,
        breadcrumb: selectBreadcrumb(payload.category),
        seller: payload.seller,
        variations: payload.products || [],
        group: {
          price: payload.price || 0,
          priceChange: payload.priceChange || 0,
          title: payload.title,
          favorite: payload.favorite || false,
          star: payload.star === undefined || 5,
          sold: payload.sold || 0,
          linkedCount: payload.linkedCount || 0,
          linked: payload.linked || false,
          view: payload.view || 0,
          images: payload.image ? [payload.image] : [],
          tags: payload.tags || [],
          brand: payload.brand || null
        }
      };
    }
  },
  effects: dispatch => ({
    async addFavoriteAsync() {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch.productDetailView.toggleFavorite();
    },
    async fetchGroupAsync() {
      const group = await fetchGroup();
      dispatch.productDetailView.setGroup(group);
    }
  })
};
