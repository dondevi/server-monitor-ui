/**
 * =============================================================================
 *  Quasar Config
 * =============================================================================
 *
 * @see http://quasar-framework.org/guide/app-quasar.conf.js.html
 * @permission Engineer
 *
 * @author dondevi
 * @create 2018-03-21
 */

module.exports = function (ctx) {
  return {
    framework: {
      components: [
        "QBtn",
        "QCard",
        "QCardMain",
        "QCardSeparator",
        "QCardTitle",
        "QChip",
        "QIcon",
        "QItem",
        "QItemMain",
        "QItemSeparator",
        "QItemSide",
        "QItemTile",
        "QLayout",
        "QLayoutHeader",
        "QList",
        "QListHeader",
        "QModal",
        "QModalLayout",
        "QPage",
        "QPageContainer",
        "QPopover",
        "QProgress",
        "QTooltip",
        "QToolbar",
        "QToolbarTitle",
      ],
      directives: [
        "BackToTop",
      ],
      plugins: [],
    },
    extras: [],
    css: [],
  };
}
