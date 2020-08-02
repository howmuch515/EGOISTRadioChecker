let put_check_log = (storage_name, nth) => {
    chrome.storage.sync.get(storage_name, res => {
        let req_set
        if (res[storage_name] === undefined) {
            req_set = [nth]
        } else {
            req_set = new Set(res[storage_name])
            req_set.add(nth)
            req_set = [...req_set]
        }
        let send_data = {}
        send_data[storage_name] = req_set

        chrome.storage.sync.set(send_data, () => {
        });
    })
}

let delete_check_log = (storage_name, nth) => {
    chrome.storage.sync.get(storage_name, res => {
        let req_set
        if (res === undefined) {
            return
        } else {
            req_set = new Set(res[storage_name])
            req_set.delete(nth)
            req_set = [...req_set]
        }
        let send_data = {}
        send_data[storage_name] = req_set

        chrome.storage.sync.set(send_data, () => {
        });
    })
}

let build_checkbox = (storage_name, nth) => {
    let check_box = $("<input>", {
        id: `check-box-${nth}`,
        class: `watched_checkbox`,
        type: "checkbox",
        value: nth
    })

    // check if listened
    chrome.storage.sync.get(storage_name, res => {
        let a = new Set(res[storage_name])
        check_box.prop('checked', a.has(nth))
    })

    // change event
    check_box.change({storage_name: storage_name, nth: nth}, event => {
        let storage_name = event.data.storage_name
        let nth = event.data.nth
        let flag = check_box.prop('checked')
        if (flag) {
            put_check_log(storage_name, nth)
        } else {
            delete_check_log(storage_name, nth)
        }
    })

    return check_box
}
