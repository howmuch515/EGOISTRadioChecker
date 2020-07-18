const BASE_URL = "https://twitter.com/intent/tweet"

let build_tweet_url = (text, url, hashtag_list) => {
    let tweet_url = `${BASE_URL}?text=${encodeURI(text)}&url=${url}&hashtags=${hashtag_list.join("%2C")}`
    return tweet_url
}

let build_text = nth => `EGOISTのラジオ第${nth}回を視聴しました！`
let hashtag_list = ["EGOIST"]

// main
let nth = $("meta[property='og:title']").attr("content").match(/Break the Spell（第(\d+)回配信）/)[1]
let video_url = $("meta[property='og:url']").attr("content").match(/https:\/\/egoist-fc.jp\/movies\/\d+/)

let tweet_url = build_tweet_url(build_text(nth), video_url, hashtag_list)

// set tweet button
let tweet_link = $("<button>").text("Tweet!").click(() => {
    window.open(tweet_url, "_blank")
})

$("#movie-show > div > div.panel-heading").append(tweet_link)
