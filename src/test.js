'use strict';

import config from 'config';
import ImageToAscii from 'image-to-ascii';
import tumblr from 'tumblr.js';

export function run() {
  var client = tumblr.createClient(config.get('tumblr'));

  client.dashboard({type: 'photo'}, (err, data) => {
    if (data.posts === undefined || data.posts.length < 1) {
      console.log("No posts found.");
      return;
    }

    data.posts.forEach((post) => {
      if (post.photos) {
        post.photos.forEach((photo) => {
          if (photo === undefined || photo.alt_sizes[5] === undefined) {
            return;
          }

          ImageToAscii(photo.alt_sizes[5].url, (err, converted) => {
            console.log(post.blog_name + ' ' + post.note_count);
            console.log(err || converted);
          })
        })
      } else {
        console.log(post.blog_name);
      }
    });
  });
}
