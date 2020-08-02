const RADIO_LIST = $("#movie-index > div > div.panel-body > ul > li")

$.each(RADIO_LIST, (i,v) => {
    let nth = abstractNumber(v)
    let check_box = build_checkbox(STORAGE_NAMES.breakthespell, nth)
    $(v).prepend(check_box)
})
