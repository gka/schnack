
const request = require('request');
const config = require('../../config.json');
const schnackEvents = require('../events');

if (config.notify.slack && config.notify.slack.webhook_url != 'xxxxx') {
    schnackEvents.on('new-comment', (event) => {
        const post_url = config.page_url.replace('%SLUG%', event.slug)+'#comment-'+event.id;
        const comment = event.comment.split(/\n+/).map(s => s ? `> _${s}_` : '>').join('\n>\n');
        const text = `A <${post_url}|new comment> was posted by ${event.user.display_name || event.user.name} under *${event.slug}*:\n\n${comment}`;
        request({
            url: config.notify.slack.webhook_url,
            method: 'post',
            json: true,
            body: { text }
        });
    });
}