import { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    // Ensure the ref is available before proceeding
    if (!container.current) return;

    // Create the script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Create the configuration for the TradingView widget
    const config = {
      autosize: true,
      symbol: "CRYPTO:BTCUSD",
      timezone: "Etc/UTC",
      theme: "light",
      style: "2",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: true,
      hide_legend: true,
      range: "5D",
      save_image: false,
      calendar: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
    };

    // Add the configuration as inner HTML (this is how TradingView expects it)
    script.innerHTML = JSON.stringify(config);

    // Append the script to the container
    container.current.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      if (container.current && script.parentNode) {
        container.current.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs once after the first render

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}

export default memo(TradingViewWidget);
