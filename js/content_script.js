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

const RADIO_LIST = $("#movie-index > div > div.panel-body > ul > li")
let abstractNumber = radio_dom => {
    let a = $(radio_dom).find("a > div > div.col-xs-8.col-sm-10.text > h3")
    return a[0].textContent.match(/Break the Spell（第(\d+)回配信/)[1]
}

$.each(RADIO_LIST, (i,v) => {
    let nth = abstractNumber(v)

    let check_box = $("<input>", {
        id: `check-box-${nth}`,
        class: `watched_checkbox`,
        type: "checkbox",
        value: nth
    })

    chrome.storage.sync.get("checked_set", res => {
        let a = new Set(res.checked_set)
        check_box.prop('checked', a.has(nth))
    })

    check_box.change({nth: nth}, event => {
        let nth = event.data.nth
        let flag = check_box.prop('checked')
        if (flag) {
            put_check_log(nth)
        } else {
            delete_check_log(nth)
        }
    })

    $(v).prepend(check_box)
})
