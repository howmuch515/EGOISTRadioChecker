const BASE_URL = "https://twitter.com/intent/tweet"

let put_check_log = nth => {
    chrome.storage.sync.get("checked_set", res => {
        let req_set
        if (res.checked_set === undefined) {
            req_set = [nth]
        } else {
            req_set = new Set(res.checked_set)
            req_set.add(nth)
            req_set = [...req_set]
        }
        chrome.storage.sync.set({checked_set: req_set}, () => {
        });
    })
}

let delete_check_log = nth => {
    chrome.storage.sync.get("checked_set", res => {
        let req_set
        if (res === undefined) {
            return
        } else {
            req_set = new Set(res.checked_set)
            req_set.delete(nth)
            req_set = [...req_set]
        }
        chrome.storage.sync.set({checked_set: req_set}, () => {
        });
    })
}

let build_tweet_url = (text, url, hashtag_list) => {
    let tweet_url = `${BASE_URL}?text=${encodeURI(text)}&url=${url}&hashtags=${hashtag_list.join("%2C")}`
    return tweet_url
}

let build_text = nth => `EGOISTのラジオ第${nth}回を視聴しました！`
let hashtag_list = ["EGOIST"]

// main
try {
    let nth = parseInt($("meta[property='og:title']").attr("content").match(/Break the Spell（第(\d+)回配信）/)[1])

    // checkbox
    let check_box = $("<input>", {
        id: `check-box-${nth}`,
        class: `watched_checkbox`,
        type: "checkbox",
        value: nth
    })

    // check if listened
    chrome.storage.sync.get("checked_set", res => {
        let a = new Set(res.checked_set)
        check_box.prop('checked', a.has(nth))
    })

    // change event
    check_box.change({nth: nth}, event => {
        let nth = event.data.nth
        let flag = check_box.prop('checked')
        if (flag) {
            put_check_log(nth)
        } else {
            delete_check_log(nth)
        }
    })

    // tweet button
    let video_url = $("meta[property='og:url']").attr("content").match(/https:\/\/egoist-fc.jp\/movies\/\d+/)

    let tweet_url = build_tweet_url(build_text(nth), video_url, hashtag_list)

    let tweet_link = $("<button>").text("Tweet!").click(() => {
        window.open(tweet_url, "_blank")
    })

    // set to dom
    let a = $("#movie-show > div > div.panel-heading")
    a.append(check_box)
    a.append(tweet_link)
}
catch (e) {
    // when access "/movie/categories/radio"
    console.log(`This page is not supported.`)
    console.log(e)
}
