const RADIO_LIST = $("#movie-index > div > div.panel-body > ul > li")

$.each(RADIO_LIST, (i,v) => {
    let nth = abstractNumber(v)

    // skip parse miss.
    if (nth !== undefined) {
        let check_box = build_checkbox(STORAGE_NAMES[0].id, nth)
        $(v).prepend(check_box)
    }
})
