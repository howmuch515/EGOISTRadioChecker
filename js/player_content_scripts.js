const BASE_URL = "https://twitter.com/intent/tweet"

let build_tweet_url = (text, url, hashtag_list) => {
    let tweet_url = `${BASE_URL}?text=${encodeURI(text)}&url=${url}&hashtags=${hashtag_list.join("%2C")}`
    return tweet_url
}

let build_text = (title, nth) => `EGOISTのWebラジオ~${title}~第${nth}回を視聴しました！`
let hashtag_list = ["EGOIST"]

// main
try {
    let nth = parseInt($("meta[property='og:title']").attr("content").match(/第(\d+)回/)[1])
    let category = ""

    if ($("meta[property='og:title']").attr("content").indexOf("僕の考えた名前のないchelly") > -1) {
        category = STORAGE_NAMES[0].id
        title = STORAGE_NAMES[0].jp_title
    } else if ($("meta[property='og:title']").attr("content").indexOf("Break the Spell") > -1) {
        category = STORAGE_NAMES[1].id
        title = STORAGE_NAMES[1].jp_title
    } else {
        throw "非対応のページです。"
    }

    let check_box = build_checkbox(category, nth)

    // tweet button
    let video_url = $("meta[property='og:url']").attr("content").match(/https:\/\/egoist-fc.jp\/movies\/\d+/)

    let tweet_url = build_tweet_url(build_text(title, nth), video_url, hashtag_list)

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
