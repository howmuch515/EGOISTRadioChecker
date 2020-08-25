$("#clear-button").click(function() {
    if (confirm("EGOISTCRadioCheckerの記録を全て削除しますか？")) {
        for (let i of STORAGE_NAMES) {
            let delete_key = i.id
            clear_check_log(delete_key)
        }
    }
})
