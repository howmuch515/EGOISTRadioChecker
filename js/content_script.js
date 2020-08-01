const RADIO_LIST = $("#movie-index > div > div.panel-body > ul > li")

let abstractNumber = radio_dom => {
    let a = $(radio_dom).find("a > div > div.col-xs-8.col-sm-10.text > h3")
    return parseInt(a[0].textContent.match(/Break the Spell（第(\d+)回配信/)[1])
}

$.each(RADIO_LIST, (i,v) => {
    let nth = abstractNumber(v)
    let check_box = build_checkbox(nth)
    $(v).prepend(check_box)
})
