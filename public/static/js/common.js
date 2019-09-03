/******************默认配置*************************/
let settings = {
    chartRefreshPeriod: 10,
    designW: 1920,
    designH: 1080,
    zoomMode:'stretch',
    notebookOptim:true
};
/*******************保存配置************************/
// localStorage.setItem('settings', JSON.stringify(settings));

//字体缩放比例
let scale = 1;
let [pageH, pageW] = [$(window).height(), $(window).width()];
const Public = {
    hasVal(val) {
        if (val === null) {
            return '-';
        }
        return val;
    },
    // 页面顶部时间
    setHeaderTime() {
        setTimeout(function () {
            let t = new Date();
            let [year, mon, date, hour, min, sec] = [
                t.getFullYear(),
                t.getMonth() + 1,
                t.getDate(),
                t.getHours(),
                t.getMinutes(),
                t.getSeconds()
            ];
            let timeHtml = `
                <span class="date"> ${year}/${mon}/${date}</span>
                <span class="digital-num">
                    ${hour} 
                    <span class="colon" style="">:</span>
                    ${(min + "").padStart(2, '0')}
                    <span class="colon" style="">:</span>
                    ${(sec + "").padStart(2, '0')}
                </span>`;
            // padStart在字符串前面补全字符串，要加空字符串
            $("#headerTime").html(timeHtml);
            Public.setHeaderTime();
        }, 500)
    },
    //页面缩放
    pageResize() {http://localhost:63342/chart/pro_bigScreenCharts/static/css/common.css.map?_ijt=cdl9vqmu3hjemo1u4q3m99evpt
        [pageH, pageW] = [$(window).height(), $(window).width()];
        let isWider = pageW / pageH > settings.designW / settings.designH;
        let [scaleW, scaleH] = [pageW / settings.designW, pageH / settings.designH];
        let $container = $("#container");
        switch (settings.zoomMode) {
            // 根据高按照设计稿调整宽度
            case "contain":
                //调节大容器宽高
                if (isWider) {
                    $container.css({width: pageH * settings.designW / settings.designH, height: '100%'});
                } else {
                    $container.css({height: pageW * settings.designH / settings.designW, width: '100%'});
                }
                scale = isWider ? scaleH : scaleW;//1:16：:1:8
                break;
            //    根据浏览器宽度调节宽高
            case 'cover':
                //溢出保持最初的样式
                $("html,body").css('overflow', 'initial');
                //调节大容器宽高
                if (isWider) {
                    $container.css({height: pageW * settings.designH / settings.designW, width: '100%'});
                } else {
                    $container.css({width: pageH * settings.designW / settings.designH, height: '100%'});
                }
                scale = isWider ? scaleW : scaleH;
                break;
            //相对于设计稿来说同比例缩放
            case 'stretch':
                scale = isWider ? scaleH : scaleW;
                //调节大容器宽高
                $container.css({width: '100%'}, {height: '100%'});
                break;
        }
        //设置根元素字体大小
        $("html").css("font-size", scale * 16 + "px").css("opacity", 1);
        localStorage.setItem('scale', JSON.stringify(scale));
        console.log("~~~~~~~~~窗口高度：" + pageH + ",\n宽度:" + pageW + " \nbody字号：" + scale)
    },
    //图表缩放
    chartsResize(charts, param) {
        $(window).resize(() => {
            Object.keys(charts).forEach(id => {
                if (param && param.notResize.includes(id)) {
                    return
                }
                charts[id].resize();
            })
        });
    },
    /**
     *
     * @param charts
     * @param t 默认刷新时间（秒）
     * @param noRefresh 无需刷新的图表
     * @param someRefresh 指定要刷新的图表，有重复指定的图表时优先权高于noRefresh
     */
    chartsReDraw(charts, t = settings.chartRefreshPeriod, noRefresh, someRefresh) {
        // let counter = setInterval(() => {
        //     Object.keys(charts).forEach(item => {
        //         if (noRefresh && noRefresh.includes(item) && !(someRefresh && someRefresh.includes(item))) return;
        //         let chart = charts[item];
        //         let opt = chart.getOption();
        //         chart.clear();
        //         chart.setOption(opt);
        //     })
        // }, (t || settings.chartRefreshPeriod) * 1000)

    },
    // 自定义方法
    initTools() {
        $.fn.extend({
            /**
             * 将文本转为数字并保留相应小数位数
             * @param n 小数位数
             * @param power 数据缩放到10的多少次方
             * @param str 后面可以跟上个字符串，比如‘%’
             */
            str2NumFixed: function (n, power, str = '') {
                $.each($(this), function () {
                    $(this).text(Public.hasVal(parseFloat($(this).text() + 'e' + power).toFixed(n) + str));
                })
            }
        })
    }
};
Public.setHeaderTime();

//jsonP
function onBack(data) {
}

Public.pageResize();
let init = () => {
    Public.initTools(); // 自定义方法
};

$(window).resize(() => {
    Public.pageResize();
});
