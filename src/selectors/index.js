import { createSelector } from "reselect";
import { uniq, get } from "lodash";
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

export const variationsSelector = createSelector(
  productDetailViewSelector,
  filterSelector,
  (view, filter) => {
    const variations = filter
      ? view.variations.filter(({ features }) => features[0].value === filter)
      : view.variations;
    return variations
      .map(({ features, _id }) => ({
        name: features
          .slice(1)
          .map(({ value }) => value)
          .join(" "),
        _id
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
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
  ({ price, tags, priceChange: delta }) => ({ price, tags, delta, delta })
);

export const brandSelector = createSelector(
  groupSelector,
  group => group.brand
);

export const activeVariationIdSelector = createSelector(
  productDetailViewSelector,
  view => view.activeVariationId
);
