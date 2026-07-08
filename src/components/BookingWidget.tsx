"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    SimplybookWidget?: new (config: Record<string, unknown>) => unknown;
  }
}

const CONTAINER_ID = "sbw_eyrwrs";

export default function BookingWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//widget.simplybook.it/v2/widget/widget.js";
    script.onload = () => {
      if (typeof window.SimplybookWidget !== "function") return;

      new window.SimplybookWidget({
        widget_type: "iframe",
        url: "https://saso.simplybook.it",
        theme: "space",
        theme_settings: {
          timeline_hide_unavailable: "1",
          sb_base_color: "#b63920",
          hide_past_days: "0",
          timeline_show_end_time: "0",
          timeline_modern_display: "as_slots",
          display_item_mode: "block",
          body_bg_color: "#ffffff",
          sb_review_image: "",
          dark_font_color: "#474747",
          light_font_color: "#ffffff",
          btn_color_1: "#b63920",
          sb_company_label_color: "#ffffff",
          hide_img_mode: "0",
          show_sidebar: "1",
          sb_busy: "#c7b3b3",
          sb_available: "#f0c6bd",
        },
        timeline: "modern",
        datepicker: "top_calendar",
        is_rtl: false,
        app_config: {
          clear_session: 0,
          allow_switch_to_ada: 0,
          predefined: [],
        },
        container_id: CONTAINER_ID,
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id={CONTAINER_ID} />;
}
