# sitev2
testing a new approach

## Example requests

* Get README url : `curl  -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://api.github.com/repos/uinelj/sitev2/readme`
* Get posts : `curl  -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://api.github.com/repos/uinelj/sitev2/contents/posts`

## Things to consider

* [Content type for markdown](https://developer.github.com/v3/repos/contents/#custom-media-types)
* Use base64 to save requests