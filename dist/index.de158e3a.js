const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: "A",
        url: "https://www.acfun.cn"
    },
    {
        logo: "B",
        url: "https://www.bilibili.com/"
    }, 
];
const simplify = (url1)=>{
    return url1.replace("https://", "").replace("http", "").replace("www.", "").replace(/\/.*/, "") //删除  / 开头的内容
    ;
};
const render = ()=>{
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
                  <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplify(node.url)}</div>
                    <div class="close">
                        <svg class="icon" >
    <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                 </div> 
        </li>`).insertBefore($lastLi);
        $li.on("click", ()=>{
            window.open(node, url);
        });
        $li.on("click", ".close", (e)=>{
            e.stopPropagation() //阻止冒泡
            ;
            console.log(hashMap);
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$(".addButton").on("click", ()=>{
    let url1 = window.prompt("请问你要添加的网址是啥？");
    if (url1.indexOf("http") !== 0) url1 = "https://" + url1;
    console.log(url1);
    hashMap.push({
        logo: simplify(url1)[0].toUpperCase(),
        url: url1
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
};
$(document).on("keypress", (e)=>{
    const { key  } = e;
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
});

//# sourceMappingURL=index.de158e3a.js.map
