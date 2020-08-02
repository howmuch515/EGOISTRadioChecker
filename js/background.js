const RULE = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          schemes: ["https"],
          hostEquals: 'egoist-fc.jp',
          pathPrefix: '/movies/'
        }
      })
    ],
    actions: [
      new chrome.declarativeContent.ShowPageAction()
    ]
  }

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([RULE])
  })