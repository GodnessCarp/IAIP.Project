if Rails.env === "production"
  Rails.application.config.session_store :cookie_store, key: "_final_app_v2", domain: "name-of-you-app-json-api"
else
  Rails.application.config.session_store :cookie_store, key: "_final_app_v2"
end
