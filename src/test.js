'use strict';

import config from 'config';
import ImageToAscii from 'image-to-ascii';
import tumblr from 'tumblr.js';

export function run() {
  var client = tumblr.createClient(config.get('tumblr'));

  client.dashboard((err, data) => {
    if (data.posts === undefined || data.posts.length < 1) {
      console.log("No posts found.");
      return;
    }

    data.posts.forEach((post) => {
      if (post.photos) {
        post.photos.forEach((photo) => {
          ImageToAscii(photo.original_size.url, (err, converted) => {
            console.log(post.blog_name);
            console.log(err || converted);
          })
        })
      } else {
        console.log(post.blog_name);
      }
    });
  });
}
