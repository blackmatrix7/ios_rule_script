const path1 = "/groups/timeline";
const path2 = "/statuses/unread";
const path3 = "/statuses/extend";
const path4 = "/comments/build_comments";
const path5 = "/photo/recommend_list";
const path6 = "/stories/video_stream";
const path7 = "/statuses/positives/get";
const path8 = "/stories/home_list";
const path9 = "/profile/statuses";
const path10 = "/statuses/friends/timeline";
const path11 = "/service/picfeed";
const path12 = "/fangle/timeline";
const path13 = "/searchall";
const path14 = "/cardlist";
const path15 = "/statuses/video_timeline";
const path16 = "/page";
const path17 = "/statuses/friends_timeline";

const url = $request.url;
var body = $response.body;

if (
    url.indexOf(path1) != -1 ||
    url.indexOf(path2) != -1 ||
    url.indexOf(path10) != -1 ||
    url.indexOf(path15) != -1 ||
    url.indexOf(path17) != -1
) {
    let obj = JSON.parse(body);
    if (obj.statuses) obj.statuses = filter_timeline_statuses(obj.statuses);
    if (obj.advertises) obj.advertises = [];
    if (obj.ad) obj.ad = [];
    if (obj.num) obj.num = obj.original_num;
    if (obj.trends) obj.trends = [];
    body = JSON.stringify(obj);
}

if (url.indexOf(path3) != -1) {
    let obj = JSON.parse(body);
    if (obj.trend) delete obj.trend;
    body = JSON.stringify(obj);
}

if (url.indexOf(path4) != -1) {
    let obj = JSON.parse(body);
    obj.recommend_max_id = 0;
    if (obj.status) {
        if (obj.top_hot_structs) {
            obj.max_id = obj.top_hot_structs.call_back_struct.max_id;
            delete obj.top_hot_structs;
        }
        if (obj.datas) obj.datas = filter_comments(obj.datas);
    } else {
        obj.datas = [];
    }
    body = JSON.stringify(obj);
}

if (url.indexOf(path5) != -1) {
    let obj = JSON.parse(body);
    obj.data = {};
    body = JSON.stringify(obj);
}

if (url.indexOf(path6) != -1) {
    let obj = JSON.parse(body);
    let segments = obj.segments;
    if (segments && segments.length > 0) {
        let i = segments.length;
        while (i--) {
            const element = segments[i];
            let is_ad = element.is_ad;
            if (is_ad && is_ad == true) segments.splice(i, 1);
        }
    }
    body = JSON.stringify(obj);
}

if (url.indexOf(path7) != -1) {
    let obj = JSON.parse(body);
    obj.datas = [];
    body = JSON.stringify(obj);
}

if (url.indexOf(path8) != -1) {
    let obj = JSON.parse(body);
    obj.story_list = [];
    body = JSON.stringify(obj);
}

if (url.indexOf(path11) != -1) {
    let obj = JSON.parse(body);
    obj.data = [];
    body = JSON.stringify(obj);
}

if (
    url.indexOf(path9) != -1 ||
    url.indexOf(path12) != -1 ||
    url.indexOf(path13) != -1 ||
    url.indexOf(path14) != -1 ||
    url.indexOf(path16) != -1
) {
    let obj = JSON.parse(body);
    if (obj.cards) obj.cards = filter_timeline_cards(obj.cards);
    body = JSON.stringify(obj);
}

$done({ body });

function filter_timeline_statuses(statuses) {
    if (statuses && statuses.length > 0) {
        let i = statuses.length;
        while (i--) {
            let element = statuses[i];
            if (is_timeline_likerecommend(element.title)) statuses.splice(i, 1);
            if (is_timeline_ad(element)) statuses.splice(i, 1);
        }
    }
    return statuses;
}

function filter_comments(datas) {
    if (datas && datas.length > 0) {
        let i = datas.length;
        while (i--) {
            const element = datas[i];
            let type = element.type;
            if (type == 5 || type == 1 || type == 6) datas.splice(i, 1);
        }
    }
    return datas;
}

function filter_timeline_cards(cards) {
    if (cards && cards.length > 0) {
        let j = cards.length;
        while (j--) {
            let item = cards[j];
            let card_group = item.card_group;
            if (card_group && card_group.length > 0) {
                let i = card_group.length;
                while (i--) {
                    let card_group_item = card_group[i];
                    let card_type = card_group_item.card_type;
                    if (card_type && card_type == 9) {
                        if (is_timeline_ad(card_group_item.mblog)) card_group.splice(i, 1);
                    } else if (card_type && card_type == 118) {
                        card_group.splice(i, 1);
                    } else if (card_type && card_type == 42) {
                        if (card_group_item.desc == '\u53ef\u80fd\u611f\u5174\u8da3\u7684\u4eba') {
                            cards.splice(j, 1);
                            break;
                        }
                    }
                }
            } else {
                let card_type = item.card_type;
                if (card_type && card_type == 9) {
                    if (is_timeline_ad(item.mblog)) cards.splice(j, 1);
                }
            }
        }
    }
    return cards;
}

function is_timeline_ad(mblog) {
    if (!mblog) return false;
    let promotiontype = mblog.promotion && mblog.promotion.type && mblog.promotion.type == "ad";
    let mblogtype = mblog.mblogtype && mblog.mblogtype == 1;
    return (promotiontype || mblogtype) ? true : false;
}

function is_timeline_likerecommend(title) {
    return title && title.type && title.type == "likerecommend" ? true : false;
}
