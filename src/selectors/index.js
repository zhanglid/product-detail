import { createSelector } from "reselect";
import {
  toPairs,
  uniq,
  get,
  mapKeys,
  pickBy,
  mapValues,
  keyBy,
  groupBy,
  sumBy
} from "lodash";
import { getFormValues } from "redux-form";
import { isString } from "util";

export const productDetailViewSelector = state => state.productDetailView;

export const groupSelector = createSelector(
  productDetailViewSelector,
  view => view.group
);

export const variationExpandedSelector = createSelector(
  productDetailViewSelector,
  view => view.variationsExpanded
);

export const activeTabKeySelector = createSelector(
  productDetailViewSelector,
  view => view.activeTabKey
);

export const breadcrumbSelector = createSelector(
  productDetailViewSelector,
  groupSelector,
  (view, group) => ({ breadcrumbs: view.breadcrumb, groupTitle: group.title })
);

export const filterSelector = createSelector(
  productDetailViewSelector,
  view => view.filter
);

export const featuresFiltersSelector = createSelector(
  productDetailViewSelector,
  view => uniq(view.variations.map(({ features }) => features[0].value))
);

export const allVariationsSelector = createSelector(
  productDetailViewSelector,
  view =>
    view.variations
      .map(({ price, features, _id }) => ({
        name: features
          .slice(1)
          .map(({ value }) => value)
          .join(" "),
        features,
        price,
        filter: get(features, "[0].value"),
        _id
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1))
);

export const variationsSelector = createSelector(
  allVariationsSelector,
  filterSelector,
  (allVariations, filter) => {
    const variations = filter
      ? allVariations.filter(variation => variation.filter === filter)
      : allVariations;
    return variations;
  }
);

export const displayInfoSelector = createSelector(
  productDetailViewSelector,
  view => {
    const { activeVariationId, variations, group } = view;
    const targetVariation = variations.find(
      ({ _id }) => _id === activeVariationId
    );
    return targetVariation || group;
  }
);

export const filterNameSelector = createSelector(
  productDetailViewSelector,
  view => get(view.variations, "[0].features[0].feature", null)
);

export const priceAreaInfoSelector = createSelector(
  displayInfoSelector,
  groupSelector,
  ({ price, priceChange: delta }, { tags }) => ({ price, tags, delta, delta })
);

export const brandSelector = createSelector(
  groupSelector,
  group => group.brand
);

export const sellerSelector = createSelector(
  groupSelector,
  ({ seller }) => get(seller, "profile.firstName")
);

export const activeVariationIdSelector = createSelector(
  productDetailViewSelector,
  view => view.activeVariationId
);

export const imagesSelector = createSelector(
  displayInfoSelector,
  info => {
    const { images = [] } = info;
    if (isString(images[0])) {
      return images;
    }
    return images.map(({ url }) => url);
  }
);

export const cartSelector = createSelector(
  productDetailViewSelector,
  view => view.cart
);

export const formSelector = state => state.form;
export const buynowFormSelector = state => getFormValues("buynow")(state);

export const selectedItemsSelector = createSelector(
  buynowFormSelector,
  allVariationsSelector,
  (values = {}, variations) => {
    const detail = mapKeys(
      pickBy(values, (value, key) => /product-/.test(key)),
      (value, key) => /product-(.*)/.exec(key)[1]
    );
    const variationsDict = keyBy(variations, "_id");
    const selectedDict = mapValues(detail, (value, key) => ({
      qty: value,
      total: value * variationsDict[key].price,
      ...variationsDict[key]
    }));
    return toPairs(
      groupBy(Object.values(selectedDict).filter(({ qty }) => !!qty), "filter")
    ).map(([key, items]) => ({
      items: items.sort((a, b) => a.name > b.name),
      filter: key,
      total: sumBy(items, "total"),
      qty: sumBy(items, "qty")
    }));
  }
);

export const hasItemSelectedSelector = createSelector(
  selectedItemsSelector,
  (items = []) => items.length > 0
);

export const summaryVisibleSelector = createSelector(
  productDetailViewSelector,
  view => view.summaryVisible
);
export const selectedItemsSummarySelector = createSelector(
  selectedItemsSelector,
  summaryVisibleSelector,
  (items, visible) => ({
    visible,
    items,
    qty: sumBy(items, "qty"),
    total: sumBy(items, "total")
  })
);

export const activeVariationSelector = createSelector(
  allVariationsSelector,
  activeVariationIdSelector,
  (variations, id) => {
    return variations.find(({_id}) => _id === id)
  }
)