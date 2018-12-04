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

export const filtersSelector = createSelector(
  productDetailViewSelector,
  view => view.filters
);

const getVariationName = (features = [], filter = []) => {
  const disabledIndexes = filter.reduce((result, value, index) => {
    if (!value) {
      return result;
    }
    return [...result, index];
  }, []);

  features = features.filter((f, index) => !disabledIndexes.includes(index));
  return features.map(({ value }) => value).join(" ");
};

export const allVariationsSelector = createSelector(
  productDetailViewSelector,
  filtersSelector,
  (view, filter) =>
    view.variations
      .map(({ price, features, _id }) => ({
        name: getVariationName(features, filter),
        features,
        price,
        filters: [get(features, "[0].value"), get(features, "[1].value")],
        _id
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1))
);

const filterVariation = (variations, filters = []) => {
  console.log(variations, "variations", filters);
  for (let index in filters) {
    if (filters[index]) {
      variations = variations.filter(
        ({ filters: variationFilters }) =>
          variationFilters[index] === filters[index]
      );
    }
  }
  return variations;
};

const getFeatureAt = ({ features }, index) => get(features, `[${index}].value`);

export const featuresFiltersSelector = createSelector(
  allVariationsSelector,
  filtersSelector,
  (variations, filters) =>
    [0, 1].map(index => {
      const featureValues = uniq(
        variations.map(variation => getFeatureAt(variation, index))
      );

      return featureValues
        .sort((a, b) => (a > b ? 1 : -1))
        .map(value => {
          let filter = [null, null];
          const other = index === 0 ? 1 : 0;
          filter[index] = value;
          filter[other] = filters[other];
          const count = filterVariation(variations, filter).length;
          return { count, value };
        });
    })
);

export const variationsSelector = createSelector(
  allVariationsSelector,
  filtersSelector,
  filterVariation
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

export const filtersNameSelector = createSelector(
  productDetailViewSelector,
  view => {
    const size = get(view.variations, `[0].features`, []).length;
    if (size > 2) {
      return [0, 1].map(index =>
        get(view.variations, `[0].features[${index}].feature`, null)
      );
    } else if (size > 1) {
      return [0].map(index =>
        get(view.variations, `[0].features[${index}].feature`, null)
      );
    }

    return [];
  }
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
      groupBy(
        Object.values(selectedDict).filter(({ qty }) => !!qty),
        "filters[0]"
      )
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