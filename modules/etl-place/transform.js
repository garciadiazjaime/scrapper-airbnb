const transform = (data) => {
  const places =
    data.data?.presentation?.explore?.sections?.sectionIndependentData?.staysMapSearch?.mapSearchResults?.map(
      (item) => {
        const price =
          item.pricingQuote?.structuredStayDisplayPrice?.secondaryLine?.price?.replace(
            /\D/g,
            ""
          ) || 0;

        return {
          id: item.listing.id,
          price,
          content: JSON.stringify(item),
        };
      }
    );

  return places;
};

module.exports = transform;
