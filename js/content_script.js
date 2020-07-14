let a = $("#movie-index > div > div.panel-body > ul > li")

let check_box = $("<input>", {
    type:"checkbox"
})

let all_check_btn = $("<button>", {
    class: "all_check_btn",
})
all_check_btn.text("↓")

a.append(check_box)
a.append(all_check_btn)
