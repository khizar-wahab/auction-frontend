const ids = [];

const currentPrices = [];

const startUpdatingCurrentPrice = () => {
    let requestExists = false;

    currentPriceUpdateInterval = setInterval(async () => {
      if (requestExists) return;

      requestExists = true;
      const res = await fetch(`${BASE_URL}/auctions/${auction.id}/current-prices/multiple?ids=${ids.join(',')}`, { method: 'GET' });
      if (!res.ok) {
        console.log("Failed to fetch current price");
      }
      else {
        const newPrice = (await res.json()).data;
        if (newPrice > currentPrice && onCurrentPriceChange) {
          onCurrentPriceChange(); // Fire event
        }
        setCurrentPrice(newPrice);
      }
      requestExists = false;
    }, 3000);
  }

  useEffect(() => {
    startUpdatingCurrentPrice();

    return () => {
      clearInterval(currentPriceUpdateInterval.current);
    }
  });