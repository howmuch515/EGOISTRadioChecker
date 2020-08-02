$("#clear-button").click(function() {
    if (confirm("EGOISTCRadioCheckerの記録を全て削除しますか？")) {
        for (let i in STORAGE_NAMES) {
            let delete_key = STORAGE_NAMES[i]
            clear_check_log(delete_key)
        }
    }
})
