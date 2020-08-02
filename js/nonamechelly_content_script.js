const RADIO_LIST = $("#movie-index > div > div.panel-body > ul > li")
const STORAGE_NAME = "nonamechelly"

let abstractNumber = radio_dom => {
    let a = $(radio_dom).find("a > div > div.col-xs-8.col-sm-10.text > h3")
    return parseInt(a[0].textContent.match(/第(\d+)回/)[1])
}

$.each(RADIO_LIST, (i,v) => {
    let nth = abstractNumber(v)
    let check_box = build_checkbox(STORAGE_NAME, nth)
    $(v).prepend(check_box)
})

