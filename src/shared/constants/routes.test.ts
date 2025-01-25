import { paths, routes } from "./routes";

// Constants for expected values
const HOME_PATH = "/";
const STATUSES_PATH = "/statuses";
const AIRCRAFTS_PATH = "/aircrafts";
const ROOT_SITEMAP_PATH = "/sitemap.xml";
const AIRCRAFT_ID = "12345";
const AIRCRAFT_PATH = `/aircrafts/${AIRCRAFT_ID}`;
const HOME_LABEL = "Aircraft list";
const STATUSES_LABEL = "Status list";
const SITEMAP_LABEL = "Seo sitemap";

describe("paths", () => {
  it("should return correct path for home", () => {
    expect(paths.home).toBe(HOME_PATH);
  });

  it("should return correct path for statuses", () => {
    expect(paths.statuses).toBe(STATUSES_PATH);
  });

  it("should return correct path for aircrafts", () => {
    expect(paths.aircrafts).toBe(AIRCRAFTS_PATH);
  });

  it("should return correct path for root sitemap", () => {
    expect(paths.rootSitemap).toBe(ROOT_SITEMAP_PATH);
  });

  it("should return correct path for a specific aircraft", () => {
    expect(paths.aircraft({ aircraftId: AIRCRAFT_ID })).toBe(AIRCRAFT_PATH);
  });
});

describe("routes", () => {
  it("should have correct route for home", () => {
    expect(routes.home.label).toBe(HOME_LABEL);
    expect(routes.home.path).toBe(HOME_PATH);
  });

  it("should have correct route for statuses", () => {
    expect(routes.statuses.label).toBe(STATUSES_LABEL);
    expect(routes.statuses.path).toBe(STATUSES_PATH);
  });

  it("should have correct route for sitemap", () => {
    expect(routes.sitemap.label).toBe(SITEMAP_LABEL);
    expect(routes.sitemap.path).toBe(ROOT_SITEMAP_PATH);
  });
});
