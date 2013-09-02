HTMLDocument.prototype.qs = function(s) {
    return Array.prototype.slice.call(document.querySelectorAll(s));
};
HTMLElement.prototype.qs = function(s) {
    return Array.prototype.slice.call(this.querySelectorAll(s));
};

(function(html){
    var markdown = function(el) {
        var html = el.innerHTML,
            child = el.childNodes,
            len = el.childNodes.length;

        if (len === 1 && child[0].nodeType === 3) {
            switch (html) {
                case "Featured":
                    html = "\n- - -\n# 특집 기사\n";
                    break;
                case "Watching":
                    html = "\n- - -\n# 동영상\n";
                    break;
                case "Reading":
                    html = "\n- - -\n# 읽을 거리\n";
                    break;
                case "Code, Libraries":
                    html = "\n- - -\n# 코드와 라이브러리들\n";
                    break;
                case "Code, Libraries and Tools":
                    html = "\n- - -\n# 코드, 라이브러리들과 도구들\n";
                    break;
                case "From our Sponsor":
                    html = "\n- - -\n# 스폰서기사\n";
                    break;
                case "Jobs":
                    html = "\n- - -\n# 일자리\n";
                    break;
                case "Last but not least..":
                    html = "\n- - -\n# 마지막으로,\n";
                    break;
            }
        }
        if (len === 3) {
            if (child[0].tagName.toLowerCase() === "strong") { //strong, br, span
                html = "## " + child[0].innerHTML + "\n" + child[2].innerHTML.trim() + "\n";
            } else { //a, br, span
                html = "## " + child[0].outerHTML + "\n";
            }
            html = html.replace(/<a href="(.+?)".*?>(.+?)<\/a>/gi, "[$2]($1)");
            html = html.replace(/<[\/]?i>/gi, "*");
            html = html.replace(/<[\/]?code>/gi, "*");
            html = html.replace(/<[\/]?em>/gi, "*");
            html = html.replace(/<img.+?>/gi, "");
            html = html.replace(/<span.*?>/gi, "");
            html = html.replace(/<\/span>/gi, "");
            html = html.replace(/<br.*?>/gi, "");
        }

        return html;
    };

    document.qs("table").pop().qs("p").forEach(function(el, i, o){
        html.push(markdown(el));
    });

    console.log(html.join("\n"));
}([]));
