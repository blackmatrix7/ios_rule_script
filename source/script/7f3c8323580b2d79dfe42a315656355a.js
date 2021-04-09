try {
  let body = $response.body.replace(/\"room_id\":(\d{2,})/g,'"room_id":"$1"');
  let obj = JSON.parse(body);
  if (obj.data) obj.data = filter_data(obj.data);
  if (obj.aweme_list) obj.aweme_list = filter_list(obj.aweme_list);
  if (obj.aweme_detail) obj.aweme_detail = filter_detail(obj.aweme_detail);
  if (obj.aweme_details) obj.aweme_details = filter_details(obj.aweme_details);
  $done({ body: JSON.stringify(obj) });
} catch (error) {
  console.log("脚本处理时遇到些问题，响应不会被修改\n" + error);
  $done({});
}

function filter_data(data) {
  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i].aweme_info) {
      if (data[i].aweme_info.is_ads === true) {
        data.splice(i, 1);
      } else if (data[i].aweme_info.video) {
        data[i].aweme_info.status.reviewed = 1;
        data[i].aweme_info.video_control.prevent_download_type = 0;
        data[i].aweme_info.video_control.allow_download = true;
        delete data[i].aweme_info.video.misc_download_addrs;
        let play = data[i].aweme_info.video.play_addr.url_list;
        data[i].aweme_info.video.download_addr.url_list = play;
        let download = data[i].aweme_info.video.download_addr;
        data[i].aweme_info.video.download_suffix_logo_addr = download;
      }
    }
    if (data[i].aweme) {
      data[i].aweme.video_control.allow_download = true;
      data[i].aweme.video_control.prevent_download_type = 0;
      data[i].aweme.status.reviewed = 1;
      delete data[i].aweme.video.misc_download_addrs;
      let play = data[i].aweme.video.play_addr.url_list;
      data[i].aweme.video.download_addr.url_list = play;
      let download = data[i].aweme.video.download_addr;
      data[i].aweme.video.download_suffix_logo_addr = download;
    }
  }
  return data;
}

function filter_list(list) {
  for (var i = list.length - 1; i >= 0; i--) {
    if (list[i].video && list[i].is_ads != true) {
      list[i].video_control.allow_download = true;
      list[i].video_control.prevent_download_type = 0;
      list[i].status.reviewed = 1;
      delete list[i].video.misc_download_addrs;
      let play = list[i].video.play_addr.url_list;
      list[i].video.download_addr.url_list = play;
      let download = list[i].video.download_addr;
      list[i].video.download_suffix_logo_addr = download;
    } else {
      list.splice(i, 1);
    }
  }
  return list;
}

function filter_detail(detail) {
  detail.status.reviewed = 1;
  detail.video_control.allow_download = true;
  detail.video_control.prevent_download_type = 0;
  let play = detail.video.play_addr.url_list;
  detail.video.download_addr.url_list = play;
  let download = detail.video.download_addr;
  detail.video.download_suffix_logo_addr = download;
  return detail;
}

function filter_details(details) {
  for (var i = details.length - 1; i >= 0; i--) {
    details[i].status.reviewed = 1;
    details[i].video_control.allow_download = true;
    details[i].video_control.prevent_download_type = 0;
    let play = details[i].video.play_addr.url_list;
    details[i].video.download_addr.url_list = play;
    let download = details[i].video.download_addr;
    details[i].video.download_suffix_logo_addr = download;
  }
  return details;
}