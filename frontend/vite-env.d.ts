interface ImportMetaEnv {
  readonly VITE_API_URL?: string; // your custom env variable
  readonly NODE_ENV: "development" | "production" | "test";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
