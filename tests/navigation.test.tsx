import { dom, enterDesktopViewport } from "./dom-setup";
import assert from "node:assert/strict";
import { after, afterEach, test } from "node:test";
import { act } from "react";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { SiteNavigation } from "../src/components/navigation/site-navigation";
import { LanguageSwitch } from "../src/components/navigation/language-switch";
import { getDictionary } from "../src/i18n/dictionaries";

afterEach(cleanup);
after(() => dom.window.close());

function renderNavigation() {
  const dictionary = getDictionary("fr");
  return render(<SiteNavigation locale="fr" currentPage="team" labels={dictionary.navigation} navigationLabel={dictionary.interface.mainNavigation} openLabel={dictionary.interface.openMenu} closeLabel={dictionary.interface.closeMenu} />);
}

test("menu exposes its controlled navigation, Escape closes it and returns focus to the trigger", () => {
  const view = renderNavigation();
  const trigger = view.getByRole("button", { name: "Ouvrir le menu" });
  const panel = view.container.querySelector<HTMLElement>("#mobile-navigation");
  assert.ok(panel);
  assert.equal(trigger.getAttribute("aria-controls"), panel.id);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.equal(panel.hidden, true);
  trigger.focus();
  fireEvent.click(trigger);
  assert.equal(trigger.getAttribute("aria-expanded"), "true");
  assert.equal(trigger.textContent, "Fermer le menu");
  assert.equal(panel.hidden, false);
  const mission = within(panel).getByRole("link", { name: "Mission" });
  mission.focus();
  assert.equal(document.activeElement, mission);
  fireEvent.keyDown(document, { key: "Escape" });
  assert.equal(panel.hidden, true);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.equal(document.activeElement, trigger);
});

test("selecting a menu link closes the disclosure; current page is explicit", () => {
  const view = renderNavigation();
  const trigger = view.getByRole("button", { name: "Ouvrir le menu" });
  fireEvent.click(trigger);
  const panel = view.container.querySelector<HTMLElement>("#mobile-navigation");
  assert.ok(panel);
  const team = within(panel).getByRole("link", { name: "Équipe" });
  assert.equal(team.getAttribute("aria-current"), "page");
  assert.equal(team.getAttribute("href"), "/fr/equipe");
  const mission = within(panel).getByRole("link", { name: "Mission" });
  // Prevent jsdom's unsupported full-document navigation, not the component callback.
  mission.addEventListener("click", (event) => event.preventDefault());
  fireEvent.click(mission);
  assert.equal(panel.hidden, true);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
});

test("moving to the desktop breakpoint clears an open mobile disclosure", () => {
  const view = renderNavigation();
  const trigger = view.getByRole("button", { name: "Ouvrir le menu" });
  fireEvent.click(trigger);
  const panel = view.container.querySelector<HTMLElement>("#mobile-navigation");
  assert.ok(panel);
  const mission = within(panel).getByRole("link", { name: "Mission" });
  mission.focus();
  // Browser CSS can blur the disappearing mobile link before matchMedia fires.
  mission.blur();
  act(enterDesktopViewport);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  const focused = document.activeElement;
  assert.equal(focused?.getAttribute("href"), "/fr/mission");
  assert.equal(panel.contains(focused), false);
});

test("desktop transition preserves focus in the nonmodal background", () => {
  const view = renderNavigation();
  const trigger = view.getByRole("button", { name: "Ouvrir le menu" });
  fireEvent.click(trigger);
  const background = document.createElement("button");
  view.container.append(background);
  background.focus();
  act(enterDesktopViewport);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.equal(document.activeElement, background);
});

test("language control names the current language and targets the equivalent translated page", () => {
  const view = render(<LanguageSwitch locale="fr" pageId="team" label="Choisir la langue" currentLabel="langue actuelle" />);
  const navigation = view.getByRole("navigation", { name: "Choisir la langue" });
  const english = within(navigation).getByRole("link", { name: "English" });
  assert.equal(english.getAttribute("href"), "/en/team");
  assert.equal(english.getAttribute("hreflang"), "en");
  assert.equal(english.getAttribute("lang"), "en");
  assert.match(navigation.querySelector('[aria-current="true"]')?.textContent ?? "", /Français.*langue actuelle/);
});
