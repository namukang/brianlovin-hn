import { browser } from 'webextension-polyfill-ts';

import 'images/icon-16.png';
import 'images/icon-48.png';
import 'images/icon-128.png';

let enableRedirect = true;

const HN_URL = 'https://news.ycombinator.com/';
const HN_ARTICLE_REGEX = /item\?id=(\d+)/;

const BRIAN_HN_URL = 'https://brianlovin.com/hn';

browser.webNavigation.onBeforeNavigate.addListener(async ({ tabId, url }) => {
  if (!enableRedirect || !url.startsWith(HN_URL)) {
    return;
  }

  // Redirect homepage
  const isHome = url === HN_URL;
  if (isHome) {
    return browser.tabs.update(tabId, {
      url: BRIAN_HN_URL,
    });
  }

  // Redirect articles and comments
  const match = url.match(HN_ARTICLE_REGEX);
  if (match) {
    const itemID = match[1];
    return browser.tabs.update(tabId, {
      url: `${BRIAN_HN_URL}/${itemID}`,
    });
  }
});

browser.browserAction.onClicked.addListener(() => {
  enableRedirect = !enableRedirect;
});
