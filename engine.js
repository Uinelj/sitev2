//TODO: requests counter. Make sure not to trigger gh limit

//From https://developers.google.com/web/fundamentals/primers/async-functions
// Get a json object from url
async function logFetch(url) {
    try {
      const response = await fetch(url);
      console.log(await response);
      return response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
}

//get a string from url
async function logFetchStr(url) {
    try {
      const response = await fetch(url);
      console.log(await response);
      return response.text();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
}

//Gets the readme page of the repo and includes it in the site html
async function get_readme() {
    //debug
    //const response_text = await dbg_readme;
    //prod
    let url = config.baseurl + config.siteurl + 'readme';
    const response_text = await logFetch(url);

    console.log(response_text);
    const response_md = atob(response_text.content);

    convert(response_md);
}

//Gets the pages/index.md of the page and includes it in the site html
async function get_index() {
    let url = 'https://raw.githubusercontent.com/'
                + config.siteurl
                + 'master/pages/index.md';
    console.log(url);
    const response = await logFetchStr(url);
    convert(response);
}


//Gets the postlist by querying the github API
async function get_posts() {

    //debug
    //const response_text = await dbg_posts;
    //prod
    let url = config.baseurl + config.siteurl + 'contents/posts';
    const response_text = await logFetch(url);

    //Reverse the postlist to have the most recent post first
    //Not sure if it will work consistently
    response_text.reverse();

    document.title = 'Posts';
    var post_list = document.getElementById('post_list');

    for (let post of db) {

        if (/*post.type == "post" && */post.state == "published") {
            //Go from 1-post.md to post
            post_text_str = post.title;

            //Forge link for post.html
            post_link_str = "post.html?p=" + post.path;

            //Create html shit
            let post_item = document.createElement('li'); //let or var?
            let post_link = document.createElement('a');
            let post_text = document.createTextNode(post_text_str);
            post_link.title = post_text_str;
            post_link.href = post_link_str;
            post_link.appendChild(post_text);
            post_item.appendChild(post_link);
            post_list.appendChild(post_item);
        }
    }
}

//Get a specific post
async function get_post() {

    //Get from the ?p=something in the url
    var params = window.location.search;
    params = params.replace('?', '').replace('=', '').replace('p', '');
    console.log(params);
    let url = 'https://raw.githubusercontent.com/'
                + config.siteurl
                + 'master/' + params;
    console.log(url);
    const response = await logFetchStr(url);
    convert(response);
}

//md->html
function convert(text) {
    var converter = new showdown.Converter();
    converter.setOption('tasklists', true);
    converter.setOption('tables', true);
    var html = converter.makeHtml(text);
    
    document.title = text.split('\n')[0].replace('#', '');
    document.getElementById('post_content').innerHTML = html;
}