import { access } from "node:fs/promises";
import { chromium } from "playwright";

export async function launchVerificationBrowser() {
  const installedChrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
  try {
    await access(installedChrome);
    return chromium.launch({ executablePath: installedChrome, headless: true, chromiumSandbox: true });
  } catch (error) {
    // Preserve actual launch failures; only use bundled Chromium if Chrome is absent.
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return chromium.launch({ headless: true, chromiumSandbox: true });
    }
    throw error;
  }
}
